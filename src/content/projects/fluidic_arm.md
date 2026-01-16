**Fluidic Arm** is a quality-of-life mod for *GregTech: Community Edition Unofficial* that introduces a new machine cover combining the behavior of two core logistics tools: the Robotic Arm and the Fluid Regulator. The result is a single, unified interface capable of moving both **items and fluids** between machines.

I built this mod to solve real pain points I encountered while playing the Nomifactory modpack—specifically, the friction of managing parallel item and fluid pipelines in dense factory layouts. By merging these systems into one cover, Fluidic Arm simplifies automation logic and reduces block-side complexity without sacrificing control.

### Key Features
- **Dual-purpose cover** that handles both item and fluid transfer
- Familiar GregTech-style UI, with mode switching between item and fluid behaviors
- Supports filtering, rate limiting, and import/export modes
- Configurable recipe generation (`none`, `easy`, or `normal`) for modpack authors
- Fully integrated with GregTech progression and research systems

### Technical Highlights
- Written in Java and designed as an extension to GTCEu’s cover system
- Reuses and adapts existing GregTech logic for consistency and compatibility
- Exposes behavior through a clean, unified UI while preserving advanced options
- Includes a flexible config layer to support custom modpacks and balance needs

Fluidic Arm is open-source (LGPLv3)