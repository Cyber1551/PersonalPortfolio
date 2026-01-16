**The Necrotic Trials** is a roguelite dungeon crawler built in Unity that puts players in the role of a powerful Necromancer. Having just descended into the depths of Hell, you must navigate through all seven layers of the underworld. Your journey culminatestes in a descent through madness where you must defeat one of the **Seven Deadly Sin bosses** at the end of each layer. The ultimate challenge awaits at the final layer: **Pride**, the first sin, where you must face a buffed-up mirror image of the very party you spent the entire run building...forcing you to defeat yourself to claim victory.

> This game and YouTube DevLog series are currently on hold due to time constraints and a shift in priorities.

### Feature Highlight: Custom Visual Ability Graph
The core of the game's depth lies in its **custom-built Node-Based Ability System** (leveraging xNode). This system moves away from rigid coding, allowing for the creation of intricate spells and interactions through a visual interface.

*   **Designer-First Workflow:** Chain nodes together to synchronize animations, VFX, delays, and logic without writing new C# for every spell.
*   **Comprehensive Node Library:**
    *   **Action Nodes:** Handle `Damage`, `Healing`, `Movement`, and `Status Effects`.
    *   **Logic & Flow:** Includes `Loops`, `Delays`, and `Conditional Branching` for complex ability sequences.
    *   **Visual Integration:** Dedicated nodes for `Animations` and `VFX` ensure gameplay events feel impactful.
*   **Dynamic Scaling:** A `FormulaNode` connects directly to the Stat System, allowing abilities to scale dynamically based on unit attributes like Strength or Intellect.

### Gameplay & Tactical Systems

#### Strategic Roguelite Combat
Combat is a tactical, turn-based affair played out on a precision **WorldGrid**.
*   **Spatial Strategy:** Utilize varied Area of Effect (AoE) shapes, including lines, cones, and circles, to maximize your Necromantic powers.
*   **Initiative Flow:** A dynamic turn-management system dictates the rhythm of battle between your undead summons and the demonic forces of Hell.

#### The Soul Collection Mechanic
As a Necromancer, **Souls** are your primary currency and lifeline.
*   **Harvesting:** Defeated enemies leave behind "World Souls" that must be tactically collected during combat.
*   **Progression:** These souls are used to unlock new abilities in the graph and augment your party's power, creating a tight loop between combat performance and character growth.

#### Robust Attribute Framework
The game features a decoupled **Stat & Modifier System** that handles the heavy lifting of RPG math.
*   **Stacking Modifiers:** Easily manage complex buffs and debuffs (e.g., percentage-based increases or flat bonuses) from equipment and spells.
*   **Data-Driven Balancing:** All unit stats and ability costs are stored in **ScriptableObjects**, allowing for rapid balancing and tuning of the game's difficulty across the seven layers of Hell.