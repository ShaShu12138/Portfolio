# Browser game restoration

All three games are static sites served by the existing Portfolio GitHub Pages site.
No credentials, school PHP backend, student records or private Git history are included.

| Path | Original project | Published version |
| --- | --- | --- |
| `space-invaders/` | `Propedeuse HBO-ICT 1 D/PB1-jingz/game` | Original p5 game with responsive layout, pointer controls, restart and local scores |
| `dungeon-exploration/` | `Propedeuse HBO-ICT 2 D/suugeeyaalaa38/game` | Original match-3 combat logic and assets, repaired mouse/touch input, bounded dragging and responsive shop |
| `check-man/` | `Propedeuse HBO-ICT 3 D/muulaasaagaa10/game` | Browser adaptation of the MonoGame single-player puzzle, using original piece/target/blocker sprites |

## Run and check

From the repository root: `python -m http.server 5190`, then open `http://localhost:5190/`.
Run the dependency-free rule regression checks with `node tests/check-man.test.mjs` and `node tests/legacy-games.test.cjs`.
With Playwright and Chromium available, run `node tests/browser-smoke.cjs` and `node tests/browser-flows.cjs`.
Optional environment variables: `PLAYWRIGHT_MODULE` (module location), `CHROME_PATH` (browser executable),
and `PORTFOLIO_TEST_URL` (defaults to `http://127.0.0.1:5190`; can target GitHub Pages).

The original school repositories remain unchanged. This repository owns the web releases.
Check Man is a port, not a MonoGame WebGL export. The source provided contains no active multiplayer server.
It preserves the 8×8 board, 6/8/10 target and obstacle difficulties, piece costs (2/3/3/4/4/5),
four-diagonal pawn attacks, blocking rays and 120-second low-cost challenge.
It adds guaranteed reachable targets, touch-friendly selection, keyboard navigation and explicit round results.
Best solutions are per puzzle and are not a global leaderboard.

Space Invaders scores stay on the current device (`localStorage`, `space-invaders.scores.v1`).
Dungeon gold/upgrades use the original `match3-Money` and `match3-Shop` cookies; clearing browser data removes them.
The original school score service is not contacted. Sound starts after user interaction and can be muted.

## Dependencies and assets

`vendor/` pins the versions already used by the school games: p5.js 1.4.1, p5.sound 1.4.1,
and js-cookie 3.0.5. Libraries retain their upstream notices; see the accompanying license files.
Game artwork and sounds are carried over from the user's original school projects.
Portfolio thumbnails are screenshots, not newly generated artwork.

## Release checks

- Space Invaders: keyboard/pointer movement, shooting, bullet consumption, game over, score save/reload, restart.
- Dungeon: mouse and touch drag, outside-board cancellation, combat/cascades, shop purchase, persistent upgrades, new run.
- Check Man: attack geometry and blockers, generated puzzle reachability, placement/removal, cost, submit and timer expiration.
- Portfolio: all nine cards link to games; external game links respond; local assets load; current CV is downloadable.
- Test at 390px phone width and desktop width; include rotation and reduced motion.

Phone checks use browser touch emulation; physical iOS/Android hardware is not part of this validation.
