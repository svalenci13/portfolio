# Kickabout

A desktop-only, single-match football mini-game. No career or external game assets.

## Match flow

The clock advances during simulation. Pick two clubs before kick-off. Position controls have been removed. The 1×, 2× and 4× controls affect simulation only. Each match includes passing, dribbling, shots, corners and headers, followed by a full-time report.

## Controls

- Drag backwards from the small ball to aim and set power. Release, then click a spot on the large ball to strike.
- Contact below centre produces a chip; contact to either side adds curl. The X marks the predicted landing point. Curl is perpendicular to travel, including across-field deliveries.
- Rolling balls and dropping crosses require timing. Defenders can tackle while you aim.
- For dribbling, hold the ball and guide it past defenders over the dashed line.
- Arrow keys and Enter provide keyboard controls. P pauses; Escape closes. Closing discards the current match.

## References and scope

The two-stage shooting mechanic is described in [Macworld’s original review](https://www.macworld.com/article/666864/new-star-soccer-for-ios-review.html). Dribbling, pressure and energy were also described in [this contemporary review](https://blancer.com/tutorials/i-phone/646802/enjoying-new-star-soccer-without-spending-a-dime-in-depth-review-tricks-and-tips-updated/). The [official game page](https://www.newstargames.com/new-star-soccer) describes the wider career game.

The single-match adaptation also incorporates the requested runs, calling teammates, landing markers, corners, rolling balls and headers. It is an original simplified implementation, not a reproduction of the original physics or match AI. Simulation movement is illustrative; playable chances use collision and ball-flight calculations.

## Verification

Run `node --experimental-strip-types --test tests/kickabout.test.mjs` and `node node_modules/typescript/bin/tsc --noEmit`. The engine tests cover match progression, pause/speed, aiming, curl/chips, moving contacts, pressure, dribbling, linked chances, goals, saves and misses. Browser playtesting is still needed for final feel and visual tuning.

## Visuals and balancing

Club crests are locally cached from football-data.org: Barcelona 81, Real Madrid 86, Manchester City 65 and Tottenham 73. The four stadium SVG illustrations are original stylized interpretations of the home grounds, not photographs or game assets. Ball panels, grass, crowd and roof structures are drawn in SVG.

Defenders spawn at least 80 field units away from the ball, with a 1.5 second opening grace period (2 seconds for headers). The goalkeeper starts from a randomized position and reacts 0.24–0.40 seconds after release. Teammate shots choose placement based on distance and angle and then run through the same flight/save physics. With no defenders in the lane, seeded checks produced roughly 71% close central, 52% angled and 42% wide conversions; defenders can lower those rates.

## Field and contact variations

The field is 680 by 1,050 world units. Each playable chance gets a cropped camera and can face up, left or right. Pointer coordinates are mapped through the SVG camera transform back into world space; player sprites remain upright. Corners originate at the actual end-line/touchline intersection and cross toward runners in the box. Free kicks vary origin, wall size, wall angle, receivers and camera direction. Wind is disabled.

Contact balls make a single pass: left/right rolls, left/right bounces, centre-to-side bounces, rising deliveries and dropping headers. They leave the contact area and the chance expires if missed. Defender counts, spacing and individual pace vary in dribbling challenges; reaction protection remains. Goal/assist/opposition-goal banners are short and respect reduced-motion preferences.

## Camera and scoring pauses

Field bounds are snapshotted when a chance is generated. Player movement, passes and teammate strikes do not change the camera. Only corners rotate; other chances remain upright. The desktop panel can reach 350px wide. Dribbling corridors are screened by anchor defenders rather than enforced by inner walls; the pointer can steer across the playable pitch. The goal banner uses the scoring club's score-strip palette and crest without rotation. The engine holds the match clock, action timers, player movement and commentary for 1.5 seconds and blocks Continue while the banner is active.

Ordinary contact deliveries use lateral rolls, lateral bounces and middle-to-forward bounces. Upward launches are no longer selected. Dropping balls remain reserved for headers. Simulation commentary can combine 12 build-up actions with 12 football outcomes, in addition to the specific event lines.
