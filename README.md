# The Conductor's Digital Companion

A one-handed, glanceable ticketing flow for Delhi Transport Corporation (DTC) bus conductors, designed for a handheld Android POS with a built-in printer.

**Kevin Naik** · Masters in Interaction Design, DTU

- **Prototype:** `/` opens the click-through flow (26 steps, six passengers, English and Hindi). Use the passenger tabs to jump to any scenario.
- **Case study:** `/casestudy` opens the slide deck.

## Run locally

```sh
python3 -m http.server 5173
```

Then open http://localhost:5173/prototype/flow.html or http://localhost:5173/documentation/casestudy/.

## What's inside

| Path | Contents |
|---|---|
| `prototype/flow.html` | Click-through prototype |
| `prototype/components.js` | Screen components, stop data, English/Hindi copy |
| `prototype/styles.css` | Visual system (4pt grid, glare-safe colours, IBM Plex) |
| `documentation/casestudy/` | Case study deck |
| `exports/flow/`, `documentation/screens/` | Screens used in the case study |

Fares, stops, distances and stop codes are placeholders for the prototype.
