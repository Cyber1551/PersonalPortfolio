**Clarity** is a local-first media management application designed to give users absolute control over their digital libraries. While most media managers "trap" your organization inside their own software, Clarity ensures that your files stay organized directly on your computer's hard drive. This makes your library portable, accessible, and independent of the app itself.

### The Problem
Traditional media managers often create a "walled garden." You might spend hours tagging and organizing your photos and videos, but that effort only exists within that specific app. If you open your standard file explorer, your files are still a disorganized mess. Furthermore, wanting the same photo in multiple "albums" usually requires creating physical copies, which quickly wastes valuable disk space.

### The Solution: Filesystem-First
Clarity was built on the philosophy that **the user should own their organization**. It doesn't just show you a pretty gallery; it actively manages your physical files to reflect your choices.

*   **Mirror-Image Organization**: Your albums and folders look exactly the same in Clarity as they do in Windows Explorer or macOS Finder. If you organize it in the app, it’s organized on your disk.
*   **Smart Deduplication**: You can place a single photo in multiple albums without using extra space. Clarity ensures only one physical copy exists on your drive while making it appear in every folder where it belongs using hardlinks that take up no extra space.
*   **Instant Portability**: Because the organization lives on your hard drive (not just in a database), you can move your library to an external drive or another computer and your folders remain perfectly intact—no software required.
*   **Effortless Maintenance**: The app handles the "busy work" in the background. Scanning for new files, generating high-quality previews, and cleaning up "orphaned" entries are all done automatically in a multi-threaded worker system.
