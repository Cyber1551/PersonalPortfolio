This project is a full-stack routing and visualization system built as part of my graduate research in collaboration with the U.S. Army Corps of Engineers. Its goal is to generate and evaluate *multiple viable convoy routes* between two points while accounting for infrastructure risk (specifically bridge health) rather than optimizing purely for distance.

> The original UI for this project was developed under an institutional account and is no longer publicly accessible.

The system consists of three layers:

- A **React** front-end that lets users select start/end points, create "Convoys" with specific weights, and visualize candidate routes on an interactive map.
- A **C# server** that orchestrates execution, scores routes, and applies a multi-criteria heuristic.
- A **Python routing engine** (invoked by the server) that uses OSMnx and NetworkX to generate diverse candidate paths over a road graph built from merged OpenStreetMap (OSM) and National Bridge Inventory (NBI) data.

Rather than producing a single “shortest path,” the Python layer repeatedly computes shortest paths while dynamically penalizing previously used edges. This creates a set of *structurally distinct* routes. Each route is then returned to the C# layer, where it is scored using a weighted heuristic that accounts for:

- Total route length
- Bridge count and condition
- Overlap with other candidate routes (contingency value)

The UI exposes these weights in real time, allowing users to explore trade-offs between efficiency, safety, and redundancy. The result is an interactive planning tool that surfaces not just *a* route, but a *portfolio* of options suitable for convoy operations.

### Technical Highlights
- Python route generation using OSMnx + NetworkX over real-world road graphs
- Iterative edge penalization to produce diverse, low-overlap paths
- C# middleware layer for orchestration, scoring, and data shaping
- React-based visualization with live weight tuning and multi-route rendering
- Integration of heterogeneous geospatial datasets (OSM + NBI)

### Research Impact
This system was validated across 25 scenario-based simulations, each generating 15 candidate routes. It demonstrates how infrastructure health and redundancy can be incorporated into routing logic for operational planning.
