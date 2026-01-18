---
title: 'Ghost Console: Custom Init System'
summary: 'Replacing systemd with a 40-line bash script for instant boot'
date: 2026-01-12
tags: [Linux, Embedded]
series: Ghost Console
part: 3
---

For a single-purpose serial console, systemd would be massive overkill. Instead, I replaced the symlink at `/sbin/init` with a custom shell script that does exactly what's needed and nothing more.
The entire init system is a simple bash script that mounts the essential filesystems, configures the environment, and drops straight into a root shell:

```bash
#!/bin/bash

# Mount essential pseudo-filesystems
mount -t proc proc /proc 2>/dev/null
mount -t sysfs sys /sys 2>/dev/null
mount -t devtmpfs dev /dev 2>/dev/null
mount -t devpts devpts /dev/pts 2>/dev/null

# Set hostname
hostname jornada

# Environment
export TERM=linux
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export HOME=/root
export SHELL=/bin/bash

# Larger font for tiny LCD (I had to download this manually)
setfont /usr/share/consolefonts/Lat15-Terminus16.psf.gz 2>/dev/null

# Prevent screen burn-in by blanking the screen after 5 minutes of inactivity
setterm -blank 5 -powerdown 5 2>/dev/null

clear
echo "Jornada Console System"
echo "======================"
echo ""

# Launch root shell
cd /root
exec /bin/bash --login
```

That's the entire init system. No services, no background daemons, no network stack. The boot chain is beautifully simple:

`ROM → Windows CE → jlinexec → kernel → init script → bash`

Total boot time from power-on to usable shell: **~14 seconds.**

--- 

## Making It *B E A U T I F U L*

To make the console a bit more pleasant to work with, I added a minimal `.bashrc` with colored output:

```bash
umask 022

# Colored ls
export LS_OPTIONS='--color=auto'
eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
```

Small touches like this make a surprising difference when you're working on a tiny LCD screen with limited contrast.

---

## The Shutdown Problem

Here's where things get interesting. While the Jornada does have a power button, it only functions in Windows CE. Once Linux boots, it becomes completely non-functional. Without a proper shutdown mechanism, the only option is to yank the battery.

This creates a serious problem: pulling the battery without syncing risks corrupting the ext2 filesystem. I learned this lesson the hard way. Twice. The second incident required running `fsck` to repair dozens of corrupted inodes.

The solution is a proper shutdown script that syncs all pending writes, remounts the filesystem as read-only, and then actually powers down the device:

```bash
#!/bin/bash
# /usr/local/bin/shutdown

echo "Shutting down..."

# Flush all writes (critical!)
sync
sync  
sync

# Remount read-only
mount -o remount, ro /

poweroff -f 2>/dev/null
```

The triple sync is intentional as it's an old Unix tradition that ensures filesystem buffers are completely flushed. The `poweroff -f` command then cleanly shuts down the system, eliminating the need to pull the battery at all.

---

## The Final Result
Every boot now lands at this prompt:
```shell
Jornada Console System
======================

root@jornada:~# _
```

No login prompt, just immediate root access. This might seem reckless, but it's actually appropriate for this use case:

- **Single-purpose device:** It only exists to provide serial console access
- **Physically secured:** It sits on my desk, not in a data center
- **No network exposure:** There's no network stack running at all
- **Serial-only access:** The serial port doesn't accept remote connections
- **Protected endpoint:** The Qubes workstation being controlled still requires its own password

The actual security boundary is at the Qubes device, not the serial console used to access it. The lack of login security on the Jornada is a feature, not a bug.