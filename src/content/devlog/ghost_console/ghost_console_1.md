---
title: 'Ghost Console: Hardware & Architecture'
summary: 'Building a physically isolated serial control plane for Qubes OS using a 25-year-old handheld'
date: 2026-01-11
tags: [Qubes, Security, Embedded]
series: Ghost Console
part: 1
---

I wanted a private, ephemeral workspace for risky or experimental tasks, such as testing unknown software, opening untrusted files, or doing research that I don’t want bleeding into my main machine.

The obvious answer is Tails OS, a lightweight ephemeral linux distro that *must* be booted from a USB. But Tails has two significant tradeoffs:

1. It is *fully* ephemeral. Any tools, packages, or configuration you install are gone on every reboot.
2. It behaves like a second physical computer. It wants its own keyboard, mouse, and monitor.

I wanted something that felt *native* to my Mac workflow with little friction. Something I could enter and leave like a window, but that still had strong isolation guarantees.

Virtual machines were the natural next step, but running them directly on macOS still leaves traces: disk artifacts, swap, logs, crash dumps, and hypervisor state. Even with care, the host and the guest remain entangled.
Additionally, VMs consume active resources and would compete with my current work, while long-running tasks would force me to keep my Mac powered on.

That’s what led me to **Qubes OS**: a system designed around disposable, strongly isolated workspaces.

The remaining problem was control. I didn’t want my Mac to be the authority over Qubes. I wanted Qubes to be headless and sovereign: something I *enter*, not something my daily machine *owns*.

The Jornada came later as a way to make that control plane **physical**.

---

## The Architecture

The final system architecture looks like this:

![ghost_console_diagram.png](/images/devlogs/ghost_console/ghost_console_diagram.png)

- The **Jornada** is the operator console
- **dom0** is never reachable from the Mac
- The **Mac** can only connect to already-running Qubes
- All real work happens inside isolated Qubes

This design creates clear boundaries between control and access. The Jornada controls what exists, while the Mac accesses what's already been authorized.

---

## The Hardware

![ghost_console1.jpeg](/images/devlogs/ghost_console/ghost_console1.jpeg)

### The Jornada

The HP Jornada 720 is a Windows CE handheld from 2000. It features a StrongARM CPU, physical keyboard, rechargeable battery with docking station, and a compact form factor. By modern standards, it's far too weak to do anything useful...which makes it perfect for dedicating to one job forever.

The Jornada is physically incapable of becoming a general-purpose machine. That's not a limitation, it's a feature. Its sole purpose is Qubes management and administrative tasks:
- Start or destroy VMs
- Monitor system state
- Modify configurations
- Manage templates

Nothing more, nothing less.

---

### The Qubes Host

The Qubes machine is a Lenovo ThinkCentre M93p. It's small, quiet, and unremarkable. Plus, I had one lying around.

Key specs:
- Intel Core i5 CPU (VT-x and VT-d enabled for hypervisor features)
- Native DB9 serial port (critical for this setup)
- 16GB RAM (upgraded from 8GB)
- 500GB SSD
- Compact desktop form factor
- No TPM chip (sad, but not a deal-breaker. Qubes doesn't require one)

It runs Qubes OS headless.

No monitor.  
No keyboard.  
No mouse.

Only serial.

---

## Why This Design Matters

The core principle is **separation of authority**.

- The Mac is powerful but untrusted
- dom0 is trusted but unreachable
- The Jornada is weak but sovereign

Even if the Mac is compromised, the attacker cannot:

- Start or stop VMs
- Modify templates
- Reconfigure networking
- Access dom0

They don't control the console, so they can't control the system.

The Jornada becomes a hardware root of control as an out-of-band authority that exists outside the system it governs. This is the same principle used in data centers with IPMI and lights-out management, just implemented with vintage hardware and a serial cable.

Qubes adds another layer of isolation: each VM is separated from the others, including critical services like networking (sys-net) and USB device management (sys-usb). This compartmentalization ensures that even if one VM is compromised, an attacker cannot pivot to control the entire system without first gaining access to dom0 (which requires physical access to the Jornada).