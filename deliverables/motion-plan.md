# Qingzheng motion plan

Result: PASS. Scene count: 4. External candidates reviewed: 3.

## Direction and recent-use check

The site uses precise, restrained automotive-engineering motion. It avoids the recently common generic “all sections fade up” as the only idea by adding a fixture-alignment motif and project-stage path. Content remains visible by default; no global timeout may mark off-screen content as played.

## External candidates

1. Motion-style bounded in-view reveal: adopt the independent viewport lifecycle principle for sections and cards; do not copy third-party layouts.
2. MDN CSS view progress timelines: partial adoption only as progressive enhancement for the project path; core visibility and controls must not depend on browser support.
3. MDN `prefers-reduced-motion`: adopt; stop carousel auto-advance and nonessential displacement while keeping all content and controls visible.

## Selected scenes

| ID | Role | Location and effect | Desktop | 390px | Reduced motion / failure |
|---|---|---|---|---|---|
| QZ-M01 | Narrative | Hero DOM eyebrow, title, copy and CTA enter in short hierarchy; three customer banners cross-fade with manual controls and pause | 420–620ms, small displacement, no full-frame darkening | shorter 240–360ms, text moved outside unsafe image zones where needed | static first slide; all text visible |
| QZ-M02 | Industry | A restrained fixture-alignment line connects requirements, engineering, fabrication/assembly and delivery collaboration | bounded path progress after real viewport entry | vertical path with shorter travel | static connected steps |
| QZ-M03 | Content | Every major section and every repeated card independently reveals on first real viewport entry; group stagger 70–90ms with capped delay | 20px / 520ms maximum | 10px / 360ms maximum | immediately visible; observer failure does not set played state |
| QZ-M04 | Interaction | Navigation, project filters, gallery triggers, CTA, FAQ and form controls use border/color/arrow/focus/press feedback | hover plus keyboard focus, 150–220ms | touch press and focus, no hover dependency | focus and state feedback remain without movement |

Desktop readiness: PASS. Mobile 390 readiness: PASS. Reduced-motion readiness: PASS. Final PASS still requires real browser evidence on the implemented build.
