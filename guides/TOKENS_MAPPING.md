# ADS Design Tokens

This document contains all Atlassian Design System tokens organized by category.

## Summary

Total tokens: 482

- **Background Colors**: 181 tokens
- **Text Colors**: 33 tokens
- **Icon Colors**: 23 tokens
- **Border Colors**: 32 tokens
- **Chart Colors**: 100 tokens
- **Link Colors**: 4 tokens
- **Skeleton Colors**: 2 tokens
- **Interaction Colors**: 2 tokens
- **Blanket Colors**: 3 tokens
- **Elevation Shadow**: 5 tokens
- **Elevation Surface**: 10 tokens
- **Opacity**: 2 tokens
- **Utility**: 1 token
- **Spacing**: 23 tokens
- **Font Size**: 8 tokens
- **Font Family**: 5 tokens
- **Font Weight**: 4 tokens
- **Typography Styles**: 14 tokens
- **Border Radius**: 7 tokens
- **Border Widths**: 2 tokens
- **Line Height**: 7 tokens
- **Letter Spacing**: 5 tokens
- **Z-Index**: 9 tokens

## Background Colors

| Token                                        | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class     | Dark Tailwind Class                | Usage                                                                                                                                   |
| -------------------------------------------- | ----------- | ---------- | ---------------- | --------------- | ------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `background.accent.blue.bolder`              | #1868db     | #669df1    | blue700          | blue400         | `bg-blue-600`            | `dark:bg-blue-300`                 | Use for blue backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.    |
| `background.accent.blue.bolder.hovered`      | #1558bc     | #8fb8f6    | blue800          | blue300         | `hover:bg-blue-700`      | `dark:hover:bg-blue-200`           | Hovered state of color.background.accent.blue.bolder.                                                                                   |
| `background.accent.blue.bolder.pressed`      | #123263     | #cfe1fd    | blue900          | blue200         | `active:bg-blue-800`     | `dark:active:bg-blue-100`          | Pressed state of color.background.accent.blue.bolder.                                                                                   |
| `background.accent.blue.subtle`              | #669df1     | #1558bc    | blue400          | blue800         | `bg-blue-300`            | `dark:bg-blue-700`                 | Use for vibrant blue backgrounds when there is no meaning tied to the color, such as colored tags.                                      |
| `background.accent.blue.subtle.hovered`      | #8fb8f6     | #123263    | blue300          | blue900         | `hover:bg-blue-200`      | `dark:hover:bg-blue-800`           | Hovered state of color.background.accent.blue.subtle.                                                                                   |
| `background.accent.blue.subtle.pressed`      | #cfe1fd     | #1c2b42    | blue200          | blue1000        | `active:bg-blue-100`     | `dark:active:bg-blue-900`          | Pressed state of color.background.accent.blue.subtle.                                                                                   |
| `background.accent.blue.subtler`             | #cfe1fd     | #123263    | blue200          | blue900         | `bg-blue-100`            | `dark:bg-blue-800`                 | Use for blue backgrounds when there is no meaning tied to the color, such as colored tags.                                              |
| `background.accent.blue.subtler.hovered`     | #8fb8f6     | #1558bc    | blue300          | blue800         | `hover:bg-blue-200`      | `dark:hover:bg-blue-700`           | Hovered state of color.background.accent.blue.subtler.                                                                                  |
| `background.accent.blue.subtler.pressed`     | #669df1     | #1868db    | blue400          | blue700         | `active:bg-blue-300`     | `dark:active:bg-blue-600`          | Pressed state of color.background.accent.blue.subtler.                                                                                  |
| `background.accent.blue.subtlest`            | #e9f2fe     | #1c2b42    | blue100          | blue1000        | `bg-blue-50`             | `dark:bg-blue-900`                 | Use for blue backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                   |
| `background.accent.blue.subtlest.hovered`    | #cfe1fd     | #123263    | blue200          | blue900         | `hover:bg-blue-100`      | `dark:hover:bg-blue-800`           | Hovered state of color.background.accent.blue.subtlest.                                                                                 |
| `background.accent.blue.subtlest.pressed`    | #8fb8f6     | #1558bc    | blue300          | blue800         | `active:bg-blue-200`     | `dark:active:bg-blue-700`          | Pressed state of color.background.accent.blue.subtlest.                                                                                 |
| `background.accent.gray.bolder`              | #6b6e76     | #96999e    | neutral700       | darkneutral700  | `bg-neutral-600`         | `dark:bg-dark-neutral-600`         | Use for gray backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.    |
| `background.accent.gray.bolder.hovered`      | #505258     | #a9abaf    | neutral800       | darkneutral800  | `hover:bg-neutral-700`   | `dark:hover:bg-dark-neutral-700`   | Hovered state of color.background.accent.gray.bolder.                                                                                   |
| `background.accent.gray.bolder.pressed`      | #3b3d42     | #bfc1c4    | neutral900       | darkneutral900  | `active:bg-neutral-800`  | `dark:active:bg-dark-neutral-800`  | Pressed state of color.background.accent.gray.subtlest.                                                                                 |
| `background.accent.gray.subtle`              | #8c8f97     | #63666b    | neutral500       | darkneutral500  | `bg-neutral-500`         | `dark:bg-dark-neutral-500`         | Use for vibrant gray backgrounds when there is no meaning tied to the color, such as colored tags.                                      |
| `background.accent.gray.subtle.hovered`      | #b7b9be     | #4b4d51    | neutral400       | darkneutral400  | `hover:bg-neutral-400`   | `dark:hover:bg-dark-neutral-400`   | Hovered state of color.background.accent.gray.subtle.                                                                                   |
| `background.accent.gray.subtle.pressed`      | #dddee1     | #3d3f43    | neutral300       | darkneutral350  | `active:bg-neutral-300`  | `dark:active:bg-dark-neutral-250`  | Pressed state of color.background.accent.gray.subtle.                                                                                   |
| `background.accent.gray.subtler`             | #dddee1     | #4b4d51    | neutral300       | darkneutral400  | `bg-neutral-300`         | `dark:bg-dark-neutral-400`         | Use for gray backgrounds when there is no meaning tied to the color, such as colored tags.                                              |
| `background.accent.gray.subtler.hovered`     | #b7b9be     | #63666b    | neutral400       | darkneutral500  | `hover:bg-neutral-400`   | `dark:hover:bg-dark-neutral-500`   | Hovered state of color.background.accent.gray.subtler.                                                                                  |
| `background.accent.gray.subtler.pressed`     | #8c8f97     | #7e8188    | neutral500       | darkneutral600  | `active:bg-neutral-500`  | `dark:active:bg-dark-neutral-500`  | Pressed state of color.background.accent.gray.subtler.                                                                                  |
| `background.accent.gray.subtlest`            | #f0f1f2     | #303134    | neutral200       | darkneutral300  | `bg-neutral-100`         | `dark:bg-dark-neutral-200`         | Use for gray backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                   |
| `background.accent.gray.subtlest.hovered`    | #dddee1     | #3d3f43    | neutral300       | darkneutral350  | `hover:bg-neutral-200`   | `dark:hover:bg-dark-neutral-250`   | Hovered state of color.background.accent.gray.subtlest.                                                                                 |
| `background.accent.gray.subtlest.pressed`    | #b7b9be     | #4b4d51    | neutral400       | darkneutral400  | `active:bg-neutral-300`  | `dark:active:bg-dark-neutral-400`  | Pressed state of color.background.accent.gray.subtlest.                                                                                 |
| `background.accent.green.bolder`             | #1f845a     | #4bce97    | green700         | green400        | `bg-green-600`           | `dark:bg-green-300`                | Use for green backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.   |
| `background.accent.green.bolder.hovered`     | #216e4e     | #7ee2b8    | green800         | green300        | `hover:bg-green-700`     | `dark:hover:bg-green-200`          | Hovered state of color.background.accent.green.bolder.                                                                                  |
| `background.accent.green.bolder.pressed`     | #164b35     | #baf3db    | green900         | green200        | `active:bg-green-800`    | `dark:active:bg-green-100`         | Pressed state of color.background.accent.green.bolder.                                                                                  |
| `background.accent.green.subtle`             | #4bce97     | #216e4e    | green400         | green800        | `bg-green-300`           | `dark:bg-green-700`                | Use for vibrant green backgrounds when there is no meaning tied to the color, such as colored tags.                                     |
| `background.accent.green.subtle.hovered`     | #7ee2b8     | #164b35    | green300         | green900        | `hover:bg-green-200`     | `dark:hover:bg-green-800`          | Hovered state of color.background.accent.green.subtle.                                                                                  |
| `background.accent.green.subtle.pressed`     | #baf3db     | #1c3329    | green200         | green1000       | `active:bg-green-100`    | `dark:active:bg-green-900`         | Pressed state of color.background.accent.green.subtle.                                                                                  |
| `background.accent.green.subtler`            | #baf3db     | #164b35    | green200         | green900        | `bg-green-100`           | `dark:bg-green-800`                | Use for green backgrounds when there is no meaning tied to the color, such as colored tags.                                             |
| `background.accent.green.subtler.hovered`    | #7ee2b8     | #216e4e    | green300         | green800        | `hover:bg-green-200`     | `dark:hover:bg-green-700`          | Hovered state of color.background.accent.green.subtler.                                                                                 |
| `background.accent.green.subtler.pressed`    | #4bce97     | #1f845a    | green400         | green700        | `active:bg-green-300`    | `dark:active:bg-green-600`         | Pressed state of color.background.accent.green.subtler.                                                                                 |
| `background.accent.green.subtlest`           | #dcfff1     | #1c3329    | green100         | green1000       | `bg-green-50`            | `dark:bg-green-900`                | Use for green backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                  |
| `background.accent.green.subtlest.hovered`   | #baf3db     | #164b35    | green200         | green900        | `hover:bg-green-100`     | `dark:hover:bg-green-800`          | Hovered state of color.background.accent.green.subtlest.                                                                                |
| `background.accent.green.subtlest.pressed`   | #7ee2b8     | #216e4e    | green300         | green800        | `active:bg-green-200`    | `dark:active:bg-green-700`         | Pressed state of color.background.accent.green.subtlest.                                                                                |
| `background.accent.lime.bolder`              | #5b7f24     | #94c748    | lime700          | lime400         | `bg-lime-600`            | `dark:bg-lime-300`                 | Use for for backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.     |
| `background.accent.lime.bolder.hovered`      | #4c6b1f     | #b3df72    | lime800          | lime300         | `hover:bg-lime-700`      | `dark:hover:bg-lime-200`           | Hovered state of color.background.accent.lime.bolder.                                                                                   |
| `background.accent.lime.bolder.pressed`      | #37471f     | #d3f1a7    | lime900          | lime200         | `active:bg-lime-800`     | `dark:active:bg-lime-100`          | Pressed state of color.background.accent.lime.bolder.                                                                                   |
| `background.accent.lime.subtle`              | #94c748     | #4c6b1f    | lime400          | lime800         | `bg-lime-300`            | `dark:bg-lime-700`                 | Use for vibrant for backgrounds when there is no meaning tied to the color, such as colored tags.                                       |
| `background.accent.lime.subtle.hovered`      | #b3df72     | #37471f    | lime300          | lime900         | `hover:bg-lime-200`      | `dark:hover:bg-lime-800`           | Hovered state of color.background.accent.lime.subtle.                                                                                   |
| `background.accent.lime.subtle.pressed`      | #d3f1a7     | #28311b    | lime200          | lime1000        | `active:bg-lime-100`     | `dark:active:bg-lime-900`          | Pressed state of color.background.accent.lime.subtle.                                                                                   |
| `background.accent.lime.subtler`             | #d3f1a7     | #37471f    | lime200          | lime900         | `bg-lime-100`            | `dark:bg-lime-800`                 | Use for for backgrounds when there is no meaning tied to the color, such as colored tags.                                               |
| `background.accent.lime.subtler.hovered`     | #b3df72     | #4c6b1f    | lime300          | lime800         | `hover:bg-lime-200`      | `dark:hover:bg-lime-700`           | Hovered state of color.background.accent.lime.subtler.                                                                                  |
| `background.accent.lime.subtler.pressed`     | #94c748     | #5b7f24    | lime400          | lime700         | `active:bg-lime-300`     | `dark:active:bg-lime-600`          | Pressed state of color.background.accent.lime.subtler.                                                                                  |
| `background.accent.lime.subtlest`            | #efffd6     | #28311b    | lime100          | lime1000        | `bg-lime-50`             | `dark:bg-lime-900`                 | Use for for backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                    |
| `background.accent.lime.subtlest.hovered`    | #d3f1a7     | #37471f    | lime200          | lime900         | `hover:bg-lime-100`      | `dark:hover:bg-lime-800`           | Hovered state of color.background.accent.lime.subtlest.                                                                                 |
| `background.accent.lime.subtlest.pressed`    | #b3df72     | #4c6b1f    | lime300          | lime800         | `active:bg-lime-200`     | `dark:active:bg-lime-700`          | Pressed state of color.background.accent.lime.subtlest.                                                                                 |
| `background.accent.magenta.bolder`           | #ae4787     | #e774bb    | magenta700       | magenta400      | `bg-pink-600`            | `dark:bg-pink-300`                 | Use for magenta backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements. |
| `background.accent.magenta.bolder.hovered`   | #943d73     | #f797d2    | magenta800       | magenta300      | `hover:bg-pink-700`      | `dark:hover:bg-pink-200`           | Hovered state of color.background.accent.magenta.bolder.                                                                                |
| `background.accent.magenta.bolder.pressed`   | #50253f     | #fdd0ec    | magenta900       | magenta200      | `active:bg-pink-800`     | `dark:active:bg-pink-100`          | Pressed state of color.background.accent.magenta.bolder.                                                                                |
| `background.accent.magenta.subtle`           | #e774bb     | #943d73    | magenta400       | magenta800      | `bg-pink-300`            | `dark:bg-pink-700`                 | Use for vibrant magenta backgrounds when there is no meaning tied to the color, such as colored tags.                                   |
| `background.accent.magenta.subtle.hovered`   | #f797d2     | #50253f    | magenta300       | magenta900      | `hover:bg-pink-200`      | `dark:hover:bg-pink-800`           | Hovered state of color.background.accent.magenta.subtle.                                                                                |
| `background.accent.magenta.subtle.pressed`   | #fdd0ec     | #3d2232    | magenta200       | magenta1000     | `active:bg-pink-100`     | `dark:active:bg-pink-900`          | Pressed state of color.background.accent.magenta.subtle.                                                                                |
| `background.accent.magenta.subtler`          | #fdd0ec     | #50253f    | magenta200       | magenta900      | `bg-pink-100`            | `dark:bg-pink-800`                 | Use for magenta backgrounds when there is no meaning tied to the color, such as colored tags.                                           |
| `background.accent.magenta.subtler.hovered`  | #f797d2     | #943d73    | magenta300       | magenta800      | `hover:bg-pink-200`      | `dark:hover:bg-pink-700`           | Hovered state of color.background.accent.magenta.subtler.                                                                               |
| `background.accent.magenta.subtler.pressed`  | #e774bb     | #ae4787    | magenta400       | magenta700      | `active:bg-pink-300`     | `dark:active:bg-pink-600`          | Pressed state of color.background.accent.magenta.subtler.                                                                               |
| `background.accent.magenta.subtlest`         | #ffecf8     | #3d2232    | magenta100       | magenta1000     | `bg-pink-50`             | `dark:bg-pink-900`                 | Use for magenta backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                |
| `background.accent.magenta.subtlest.hovered` | #fdd0ec     | #50253f    | magenta200       | magenta900      | `hover:bg-pink-100`      | `dark:hover:bg-pink-800`           | Hovered state of color.background.accent.magenta.subtlest.                                                                              |
| `background.accent.magenta.subtlest.pressed` | #f797d2     | #943d73    | magenta300       | magenta800      | `active:bg-pink-200`     | `dark:active:bg-pink-700`          | Pressed state of color.background.accent.magenta.subtlest.                                                                              |
| `background.accent.orange.bolder`            | #bd5b00     | #fca700    | orange700        | orange400       | `bg-orange-600`          | `dark:bg-orange-300`               | Use for orange backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.  |
| `background.accent.orange.bolder.hovered`    | #9e4c00     | #fbc828    | orange800        | orange300       | `hover:bg-orange-700`    | `dark:hover:bg-orange-200`         | Hovered state of color.background.accent.orange.bolder.                                                                                 |
| `background.accent.orange.bolder.pressed`    | #693200     | #fce4a6    | orange900        | orange200       | `active:bg-orange-800`   | `dark:active:bg-orange-100`        | Pressed state of color.background.accent.orange.bolder.                                                                                 |
| `background.accent.orange.subtle`            | #fca700     | #9e4c00    | orange400        | orange800       | `bg-orange-300`          | `dark:bg-orange-700`               | Use for vibrant orange backgrounds when there is no meaning tied to the color, such as colored tags.                                    |
| `background.accent.orange.subtle.hovered`    | #fbc828     | #693200    | orange300        | orange900       | `hover:bg-orange-200`    | `dark:hover:bg-orange-800`         | Hovered state of color.background.accent.orange.subtle.                                                                                 |
| `background.accent.orange.subtle.pressed`    | #fce4a6     | #3a2c1f    | orange200        | orange1000      | `active:bg-orange-100`   | `dark:active:bg-orange-900`        | Pressed state of color.background.accent.orange.subtle.                                                                                 |
| `background.accent.orange.subtler`           | #fce4a6     | #693200    | orange200        | orange900       | `bg-orange-100`          | `dark:bg-orange-800`               | Use for orange backgrounds when there is no meaning tied to the color, such as colored tags.                                            |
| `background.accent.orange.subtler.hovered`   | #fbc828     | #9e4c00    | orange300        | orange800       | `hover:bg-orange-200`    | `dark:hover:bg-orange-700`         | Hovered state of color.background.accent.orange.subtler.                                                                                |
| `background.accent.orange.subtler.pressed`   | #fca700     | #bd5b00    | orange400        | orange700       | `active:bg-orange-300`   | `dark:active:bg-orange-600`        | Pressed state of color.background.accent.orange.subtler.                                                                                |
| `background.accent.orange.subtlest`          | #fff5db     | #3a2c1f    | orange100        | orange1000      | `bg-orange-50`           | `dark:bg-orange-900`               | Use for orange backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                 |
| `background.accent.orange.subtlest.hovered`  | #fce4a6     | #693200    | orange200        | orange900       | `hover:bg-orange-100`    | `dark:hover:bg-orange-800`         | Hovered state of color.background.accent.orange.subtlest.                                                                               |
| `background.accent.orange.subtlest.pressed`  | #fbc828     | #9e4c00    | orange300        | orange800       | `active:bg-orange-200`   | `dark:active:bg-orange-700`        | Pressed state of color.background.accent.orange.subtlest.                                                                               |
| `background.accent.purple.bolder`            | #964ac0     | #c97cf4    | purple700        | purple400       | `bg-purple-600`          | `dark:bg-purple-300`               | Use for purple backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.  |
| `background.accent.purple.bolder.hovered`    | #803fa5     | #d8a0f7    | purple800        | purple300       | `hover:bg-purple-700`    | `dark:hover:bg-purple-200`         | Hovered state of color.background.accent.purple.bolder.                                                                                 |
| `background.accent.purple.bolder.pressed`    | #48245d     | #eed7fc    | purple900        | purple200       | `active:bg-purple-800`   | `dark:active:bg-purple-100`        | Pressed state of color.background.accent.purple.bolder.                                                                                 |
| `background.accent.purple.subtle`            | #c97cf4     | #803fa5    | purple400        | purple800       | `bg-purple-300`          | `dark:bg-purple-700`               | Use for vibrant purple backgrounds when there is no meaning tied to the color, such as colored tags.                                    |
| `background.accent.purple.subtle.hovered`    | #d8a0f7     | #48245d    | purple300        | purple900       | `hover:bg-purple-200`    | `dark:hover:bg-purple-800`         | Hovered state of color.background.accent.purple.subtle.                                                                                 |
| `background.accent.purple.subtle.pressed`    | #eed7fc     | #35243f    | purple200        | purple1000      | `active:bg-purple-100`   | `dark:active:bg-purple-900`        | Pressed state of color.background.accent.purple.subtle.                                                                                 |
| `background.accent.purple.subtler`           | #eed7fc     | #48245d    | purple200        | purple900       | `bg-purple-100`          | `dark:bg-purple-800`               | Use for purple backgrounds when there is no meaning tied to the color, such as colored tags.                                            |
| `background.accent.purple.subtler.hovered`   | #d8a0f7     | #803fa5    | purple300        | purple800       | `hover:bg-purple-200`    | `dark:hover:bg-purple-700`         | Hovered state of color.background.accent.purple.subtler.                                                                                |
| `background.accent.purple.subtler.pressed`   | #c97cf4     | #964ac0    | purple400        | purple700       | `active:bg-purple-300`   | `dark:active:bg-purple-600`        | Pressed state of color.background.accent.purple.subtler.                                                                                |
| `background.accent.purple.subtlest`          | #f8eefe     | #35243f    | purple100        | purple1000      | `bg-purple-50`           | `dark:bg-purple-900`               | Use for purple backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                 |
| `background.accent.purple.subtlest.hovered`  | #eed7fc     | #48245d    | purple200        | purple900       | `hover:bg-purple-100`    | `dark:hover:bg-purple-800`         | Hovered state of color.background.accent.purple.subtlest.                                                                               |
| `background.accent.purple.subtlest.pressed`  | #d8a0f7     | #803fa5    | purple300        | purple800       | `active:bg-purple-200`   | `dark:active:bg-purple-700`        | Pressed state of color.background.accent.purple.subtlest.                                                                               |
| `background.accent.red.bolder`               | #c9372c     | #f87168    | red700           | red400          | `bg-red-600`             | `dark:bg-red-300`                  | Use for red backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.     |
| `background.accent.red.bolder.hovered`       | #ae2e24     | #fd9891    | red800           | red300          | `hover:bg-red-700`       | `dark:hover:bg-red-200`            | Hovered state of color.background.accent.red.bolder.                                                                                    |
| `background.accent.red.bolder.pressed`       | #5d1f1a     | #ffd5d2    | red900           | red200          | `active:bg-red-800`      | `dark:active:bg-red-100`           | Pressed state of color.background.accent.red.bolder.                                                                                    |
| `background.accent.red.subtle`               | #f87168     | #ae2e24    | red400           | red800          | `bg-red-300`             | `dark:bg-red-700`                  | Use for vibrant red backgrounds when there is no meaning tied to the color, such as colored tags.                                       |
| `background.accent.red.subtle.hovered`       | #fd9891     | #5d1f1a    | red300           | red900          | `hover:bg-red-200`       | `dark:hover:bg-red-800`            | Hovered state of color.background.accent.red.subtle.                                                                                    |
| `background.accent.red.subtle.pressed`       | #ffd5d2     | #42221f    | red200           | red1000         | `active:bg-red-100`      | `dark:active:bg-red-900`           | Pressed state of color.background.accent.red.subtle.                                                                                    |
| `background.accent.red.subtler`              | #ffd5d2     | #5d1f1a    | red200           | red900          | `bg-red-100`             | `dark:bg-red-800`                  | Use for red backgrounds when there is no meaning tied to the color, such as colored tags.                                               |
| `background.accent.red.subtler.hovered`      | #fd9891     | #ae2e24    | red300           | red800          | `hover:bg-red-200`       | `dark:hover:bg-red-700`            | Hovered state of color.background.accent.red.subtler.                                                                                   |
| `background.accent.red.subtler.pressed`      | #f87168     | #c9372c    | red400           | red700          | `active:bg-red-300`      | `dark:active:bg-red-600`           | Pressed state of color.background.accent.red.subtler.                                                                                   |
| `background.accent.red.subtlest`             | #ffeceb     | #42221f    | red100           | red1000         | `bg-red-50`              | `dark:bg-red-900`                  | Use for red backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                    |
| `background.accent.red.subtlest.hovered`     | #ffd5d2     | #5d1f1a    | red200           | red900          | `hover:bg-red-100`       | `dark:hover:bg-red-800`            | Hovered state of color.background.accent.red.subtlest.                                                                                  |
| `background.accent.red.subtlest.pressed`     | #fd9891     | #ae2e24    | red300           | red800          | `active:bg-red-200`      | `dark:active:bg-red-700`           | Pressed state of color.background.accent.red.subtlest.                                                                                  |
| `background.accent.teal.bolder`              | #227d9b     | #6cc3e0    | teal700          | teal400         | `bg-teal-600`            | `dark:bg-teal-300`                 | Use for teal backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.    |
| `background.accent.teal.bolder.hovered`      | #206a83     | #9dd9ee    | teal800          | teal300         | `hover:bg-teal-700`      | `dark:hover:bg-teal-200`           | Hovered state of color.background.accent.teal.bolder.                                                                                   |
| `background.accent.teal.bolder.pressed`      | #164555     | #c6edfb    | teal900          | teal200         | `active:bg-teal-800`     | `dark:active:bg-teal-100`          | Pressed state of color.background.accent.teal.bolder.                                                                                   |
| `background.accent.teal.subtle`              | #6cc3e0     | #206a83    | teal400          | teal800         | `bg-teal-300`            | `dark:bg-teal-700`                 | Use for vibrant teal backgrounds when there is no meaning tied to the color, such as colored tags.                                      |
| `background.accent.teal.subtle.hovered`      | #9dd9ee     | #164555    | teal300          | teal900         | `hover:bg-teal-200`      | `dark:hover:bg-teal-800`           | Hovered state of color.background.accent.teal.subtle.                                                                                   |
| `background.accent.teal.subtle.pressed`      | #c6edfb     | #1e3137    | teal200          | teal1000        | `active:bg-teal-100`     | `dark:active:bg-teal-900`          | Pressed state of color.background.accent.teal.subtle.                                                                                   |
| `background.accent.teal.subtler`             | #c6edfb     | #164555    | teal200          | teal900         | `bg-teal-100`            | `dark:bg-teal-800`                 | Use for teal backgrounds when there is no meaning tied to the color, such as colored tags.                                              |
| `background.accent.teal.subtler.hovered`     | #9dd9ee     | #206a83    | teal300          | teal800         | `hover:bg-teal-200`      | `dark:hover:bg-teal-700`           | Hovered state of color.background.accent.teal.subtler.                                                                                  |
| `background.accent.teal.subtler.pressed`     | #6cc3e0     | #227d9b    | teal400          | teal700         | `active:bg-teal-300`     | `dark:active:bg-teal-600`          | Pressed state of color.background.accent.teal.subtler.                                                                                  |
| `background.accent.teal.subtlest`            | #e7f9ff     | #1e3137    | teal100          | teal1000        | `bg-teal-50`             | `dark:bg-teal-900`                 | Use for teal backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                   |
| `background.accent.teal.subtlest.hovered`    | #c6edfb     | #164555    | teal200          | teal900         | `hover:bg-teal-100`      | `dark:hover:bg-teal-800`           | Hovered state of color.background.accent.teal.subtlest.                                                                                 |
| `background.accent.teal.subtlest.pressed`    | #9dd9ee     | #206a83    | teal300          | teal800         | `active:bg-teal-200`     | `dark:active:bg-teal-700`          | Pressed state of color.background.accent.teal.subtlest.                                                                                 |
| `background.accent.yellow.bolder`            | #946f00     | #ddb30e    | yellow700        | yellow400       | `bg-yellow-600`          | `dark:bg-yellow-300`               | Use for yellow backgrounds when there is no meaning tied to the color, and the background needs to pass min 3:1 contrast requirements.  |
| `background.accent.yellow.bolder.hovered`    | #7f5f01     | #eed12b    | yellow800        | yellow300       | `hover:bg-yellow-700`    | `dark:hover:bg-yellow-200`         | Hovered state of color.background.accent.yellow.bolder.                                                                                 |
| `background.accent.yellow.bolder.pressed`    | #533f04     | #f5e989    | yellow900        | yellow200       | `active:bg-yellow-800`   | `dark:active:bg-yellow-100`        | Pressed state of color.background.accent.yellow.bolder.                                                                                 |
| `background.accent.yellow.subtle`            | #eed12b     | #7f5f01    | yellow300        | yellow800       | `bg-yellow-200`          | `dark:bg-yellow-700`               | Use for vibrant yellow backgrounds when there is no meaning tied to the color, such as colored tags.                                    |
| `background.accent.yellow.subtle.hovered`    | #ddb30e     | #533f04    | yellow400        | yellow900       | `hover:bg-yellow-300`    | `dark:hover:bg-yellow-800`         | Hovered state of color.background.accent.yellow.subtle.                                                                                 |
| `background.accent.yellow.subtle.pressed`    | #cf9f02     | #332e1b    | yellow500        | yellow1000      | `active:bg-yellow-400`   | `dark:active:bg-yellow-900`        | Pressed state of color.background.accent.yellow.subtle.                                                                                 |
| `background.accent.yellow.subtler`           | #f5e989     | #533f04    | yellow200        | yellow900       | `bg-yellow-100`          | `dark:bg-yellow-800`               | Use for yellow backgrounds when there is no meaning tied to the color, such as colored tags.                                            |
| `background.accent.yellow.subtler.hovered`   | #eed12b     | #7f5f01    | yellow300        | yellow800       | `hover:bg-yellow-200`    | `dark:hover:bg-yellow-700`         | Hovered state of color.background.accent.yellow.subtler.                                                                                |
| `background.accent.yellow.subtler.pressed`   | #ddb30e     | #946f00    | yellow400        | yellow700       | `active:bg-yellow-300`   | `dark:active:bg-yellow-600`        | Pressed state of color.background.accent.yellow.subtler.                                                                                |
| `background.accent.yellow.subtlest`          | #fef7c8     | #332e1b    | yellow100        | yellow1000      | `bg-yellow-50`           | `dark:bg-yellow-900`               | Use for yellow backgrounds when there is no meaning tied to the color. Reserved for when you only want a hint of color.                 |
| `background.accent.yellow.subtlest.hovered`  | #f5e989     | #533f04    | yellow200        | yellow900       | `hover:bg-yellow-100`    | `dark:hover:bg-yellow-800`         | Hovered state of color.background.accent.yellow.subtlest.                                                                               |
| `background.accent.yellow.subtlest.pressed`  | #eed12b     | #7f5f01    | yellow300        | yellow800       | `active:bg-yellow-200`   | `dark:active:bg-yellow-700`        | Pressed state of color.background.accent.yellow.subtlest.                                                                               |
| `background.brand.bold`                      | #1868db     | #669df1    | blue700          | blue400         | `bg-blue-600`            | `dark:bg-blue-300`                 | Use for the background of elements used to reinforce our brand, but with more emphasis.                                                 |
| `background.brand.bold.hovered`              | #1558bc     | #8fb8f6    | blue800          | blue300         | `hover:bg-blue-700`      | `dark:hover:bg-blue-200`           | Hovered state of color.background.brand.bold.                                                                                           |
| `background.brand.bold.pressed`              | #123263     | #cfe1fd    | blue900          | blue200         | `active:bg-blue-800`     | `dark:active:bg-blue-100`          | Pressed state of color.background.brand.bold.                                                                                           |
| `background.brand.boldest`                   | #1c2b42     | #e9f2fe    | blue1000         | blue100         | `bg-blue-900`            | `dark:bg-blue-50`                  | Use for the background of elements used to reinforce our brand, that need to stand out a lot.                                           |
| `background.brand.boldest.hovered`           | #123263     | #cfe1fd    | blue900          | blue200         | `hover:bg-blue-800`      | `dark:hover:bg-blue-100`           | Hovered state of color.background.brand.boldest.                                                                                        |
| `background.brand.boldest.pressed`           | #1558bc     | #8fb8f6    | blue800          | blue300         | `active:bg-blue-700`     | `dark:active:bg-blue-200`          | Pressed state of color.background.brand.boldest.                                                                                        |
| `background.brand.subtlest`                  | #e9f2fe     | #1c2b42    | blue100          | blue1000        | `bg-blue-50`             | `dark:bg-blue-900`                 | Use for the background of elements used to reinforce our brand, but with less emphasis.                                                 |
| `background.brand.subtlest.hovered`          | #cfe1fd     | #123263    | blue200          | blue900         | `hover:bg-blue-100`      | `dark:hover:bg-blue-800`           | Hovered state of color.background.brand.subtlest.                                                                                       |
| `background.brand.subtlest.pressed`          | #8fb8f6     | #1558bc    | blue300          | blue800         | `active:bg-blue-200`     | `dark:active:bg-blue-700`          | Pressed state of color.background.brand.subtlest                                                                                        |
| `background.danger`                          | #ffeceb     | #42221f    | red100           | red1000         | `bg-red-50`              | `dark:bg-red-900`                  | Use for backgrounds communicating critical information, such in error section messages.                                                 |
| `background.danger.bold`                     | #c9372c     | #f87168    | red700           | red400          | `bg-red-600`             | `dark:bg-red-300`                  | A vibrant background option for communicating critical information, such as in danger buttons and error banners.                        |
| `background.danger.bold.hovered`             | #ae2e24     | #fd9891    | red800           | red300          | `hover:bg-red-700`       | `dark:hover:bg-red-200`            | Hovered state of color.background.danger.bold                                                                                           |
| `background.danger.bold.pressed`             | #5d1f1a     | #ffd5d2    | red900           | red200          | `active:bg-red-800`      | `dark:active:bg-red-100`           | Pressed state of color.background.danger.bold                                                                                           |
| `background.danger.hovered`                  | #ffd5d2     | #5d1f1a    | red200           | red900          | `hover:bg-red-100`       | `dark:hover:bg-red-800`            | Hovered state for color.background.danger                                                                                               |
| `background.danger.pressed`                  | #fd9891     | #ae2e24    | red300           | red800          | `active:bg-red-200`      | `dark:active:bg-red-700`           | Pressed state for color.background.danger                                                                                               |
| `background.disabled`                        | #17171708   | #01040475  | neutral100a      | darkneutral100a | `bg-neutral-50a`         | `dark:bg-dark-neutral-50a`         | Use for backgrounds of elements in a disabled state.                                                                                    |
| `background.discovery`                       | #f8eefe     | #35243f    | purple100        | purple1000      | `bg-purple-50`           | `dark:bg-purple-900`               | Use for backgrounds communicating change or something new, such as in discovery section messages.                                       |
| `background.discovery.bold`                  | #964ac0     | #c97cf4    | purple700        | purple400       | `bg-purple-600`          | `dark:bg-purple-300`               | A vibrant background option communicating change or something new, such as in onboarding spotlights.                                    |
| `background.discovery.bold.hovered`          | #803fa5     | #d8a0f7    | purple800        | purple300       | `hover:bg-purple-700`    | `dark:hover:bg-purple-200`         | Hovered state of color.background.discovery.bold                                                                                        |
| `background.discovery.bold.pressed`          | #48245d     | #eed7fc    | purple900        | purple200       | `active:bg-purple-800`   | `dark:active:bg-purple-100`        | Pressed state of color.background.discovery.bold                                                                                        |
| `background.discovery.hovered`               | #eed7fc     | #48245d    | purple200        | purple900       | `hover:bg-purple-100`    | `dark:hover:bg-purple-800`         | Hover state for color.background.discovery                                                                                              |
| `background.discovery.pressed`               | #d8a0f7     | #803fa5    | purple300        | purple800       | `active:bg-purple-200`   | `dark:active:bg-purple-700`        | Pressed state for color.background.discovery                                                                                            |
| `background.information`                     | #e9f2fe     | #1c2b42    | blue100          | blue1000        | `bg-blue-50`             | `dark:bg-blue-900`                 | Use for backgrounds communicating information or something in-progress, such as in information section messages.                        |
| `background.information.bold`                | #1868db     | #669df1    | blue700          | blue400         | `bg-blue-600`            | `dark:bg-blue-300`                 | A vibrant background option for communicating information or something in-progress.                                                     |
| `background.information.bold.hovered`        | #1558bc     | #8fb8f6    | blue800          | blue300         | `hover:bg-blue-700`      | `dark:hover:bg-blue-200`           | Hovered state of color.background.information.bold                                                                                      |
| `background.information.bold.pressed`        | #123263     | #cfe1fd    | blue900          | blue200         | `active:bg-blue-800`     | `dark:active:bg-blue-100`          | Pressed state of color.background.information.bold                                                                                      |
| `background.information.hovered`             | #cfe1fd     | #123263    | blue200          | blue900         | `hover:bg-blue-100`      | `dark:hover:bg-blue-800`           | Hovered state of color.background.information                                                                                           |
| `background.information.pressed`             | #8fb8f6     | #1558bc    | blue300          | blue800         | `active:bg-blue-200`     | `dark:active:bg-blue-700`          | Pressed state of color.background.information                                                                                           |
| `background.input`                           | #ffffff     | #242528    | neutral0         | darkneutral200  | `bg-neutral-0`           | `dark:bg-dark-neutral-100`         | Use for background of form UI elements, such as text fields, checkboxes, and radio buttons.                                             |
| `background.input.hovered`                   | #f8f8f8     | #2b2c2f    | neutral100       | darkneutral250  | `hover:bg-neutral-50`    | `dark:hover:bg-dark-neutral-150`   | Hovered state for color.background.input                                                                                                |
| `background.input.pressed`                   | #ffffff     | #242528    | neutral0         | darkneutral200  | `active:bg-neutral-0`    | `dark:active:bg-dark-neutral-100`  | Pressed state for color.background.input                                                                                                |
| `background.inverse.subtle`                  | #00000029   | #ffffff29  | N/A              | N/A             | `bg-black/16`            | `dark:bg-white/16`                 | Use for backgrounds of elements on a bold background, such as in the buttons on spotlight cards.                                        |
| `background.inverse.subtle.hovered`          | #0000003d   | #ffffff3d  | N/A              | N/A             | `hover:bg-black/24`      | `dark:hover:bg-white/24`           | Use for the hovered state of color.background.inverse.subtle                                                                            |
| `background.inverse.subtle.pressed`          | #00000052   | #ffffff52  | N/A              | N/A             | `active:bg-black/32`     | `dark:active:bg-white/32`          | Use for the pressed state of color.background.inverse.subtle                                                                            |
| `background.neutral`                         | #0515240f   | #ceced912  | neutral200a      | darkneutral200a | `bg-neutral-100a`        | `dark:bg-dark-neutral-100a`        | The default background for neutral elements, such as default buttons.                                                                   |
| `background.neutral.bold`                    | #292a2e     | #cecfd2    | neutral1000      | darkneutral1000 | `bg-neutral-900`         | `dark:bg-dark-neutral-900`         | A vibrant background option for neutral UI elements, such as announcement banners.                                                      |
| `background.neutral.bold.hovered`            | #3b3d42     | #bfc1c4    | neutral900       | darkneutral900  | `hover:bg-neutral-800`   | `dark:hover:bg-dark-neutral-800`   | Hovered state of color.background.neutral.bold                                                                                          |
| `background.neutral.bold.pressed`            | #505258     | #a9abaf    | neutral800       | darkneutral800  | `active:bg-neutral-700`  | `dark:active:bg-dark-neutral-700`  | Pressed state of color.background.neutral.bold                                                                                          |
| `background.neutral.hovered`                 | #0b120e24   | #e3e4f21f  | neutral300a      | darkneutral300a | `hover:bg-neutral-200a`  | `dark:hover:bg-dark-neutral-200a`  | Hovered state for color.background.neutral                                                                                              |
| `background.neutral.pressed`                 | #080f214a   | #e5e9f640  | neutral400a      | darkneutral400a | `active:bg-neutral-300a` | `dark:active:bg-dark-neutral-300a` | Pressed state for color.background.neutral                                                                                              |
| `background.neutral.subtle`                  | #00000000   | #00000000  | transparent      | transparent     | `bg-transparent`         | `dark:bg-transparent`              | Use for the background of elements that appear to have no background in a resting state, such as subtle buttons and menu items.         |
| `background.neutral.subtle.hovered`          | #0515240f   | #ceced912  | neutral200a      | darkneutral200a | `hover:bg-neutral-100a`  | `dark:hover:bg-dark-neutral-100a`  | Hovered state for color.background.neutral.subtle                                                                                       |
| `background.neutral.subtle.pressed`          | #0b120e24   | #e3e4f21f  | neutral300a      | darkneutral300a | `active:bg-neutral-200a` | `dark:active:bg-dark-neutral-200a` | Pressed state for color.background.neutral.subtle                                                                                       |
| `background.selected`                        | #e9f2fe     | #1c2b42    | blue100          | blue1000        | `bg-blue-50`             | `dark:bg-blue-900`                 | Use for the background of elements in a selected state, such as in opened dropdown buttons.                                             |
| `background.selected.bold`                   | #1868db     | #669df1    | blue700          | blue400         | `bg-blue-600`            | `dark:bg-blue-300`                 | Use for the backgrounds of elements in a selected state, such as checkboxes and radio buttons.                                          |
| `background.selected.bold.hovered`           | #1558bc     | #8fb8f6    | blue800          | blue300         | `hover:bg-blue-700`      | `dark:hover:bg-blue-200`           | Hovered state of color.background.selected.bold                                                                                         |
| `background.selected.bold.pressed`           | #123263     | #cfe1fd    | blue900          | blue200         | `active:bg-blue-800`     | `dark:active:bg-blue-100`          | Pressed state of color.background.selected.bold                                                                                         |
| `background.selected.hovered`                | #cfe1fd     | #123263    | blue200          | blue900         | `hover:bg-blue-100`      | `dark:hover:bg-blue-800`           | Hovered state for color.background.selected                                                                                             |
| `background.selected.pressed`                | #8fb8f6     | #1558bc    | blue300          | blue800         | `active:bg-blue-200`     | `dark:active:bg-blue-700`          | Pressed state for color.background.selected                                                                                             |
| `background.success`                         | #dcfff1     | #1c3329    | green100         | green1000       | `bg-green-50`            | `dark:bg-green-900`                | Use for backgrounds communicating a favorable outcome, such as in success section messages.                                             |
| `background.success.bold`                    | #1f845a     | #4bce97    | green700         | green400        | `bg-green-600`           | `dark:bg-green-300`                | A vibrant background option for communicating a favorable outcome, such as in checked toggles.                                          |
| `background.success.bold.hovered`            | #216e4e     | #7ee2b8    | green800         | green300        | `hover:bg-green-700`     | `dark:hover:bg-green-200`          | Hovered state of color.background.success.bold                                                                                          |
| `background.success.bold.pressed`            | #164b35     | #baf3db    | green900         | green200        | `active:bg-green-800`    | `dark:active:bg-green-100`         | Pressed state of color.background.success.bold                                                                                          |
| `background.success.hovered`                 | #baf3db     | #164b35    | green200         | green900        | `hover:bg-green-100`     | `dark:hover:bg-green-800`          | Hovered state for color.background.success                                                                                              |
| `background.success.pressed`                 | #7ee2b8     | #216e4e    | green300         | green800        | `active:bg-green-200`    | `dark:active:bg-green-700`         | Pressed state for color.background.success                                                                                              |
| `background.warning`                         | #fef7c8     | #332e1b    | yellow100        | yellow1000      | `bg-yellow-50`           | `dark:bg-yellow-900`               | Use for backgrounds communicating caution, such as in warning section messages.                                                         |
| `background.warning.bold`                    | #eed12b     | #eed12b    | yellow300        | yellow300       | `bg-yellow-200`          | `dark:bg-yellow-200`               | A vibrant background option for communicating caution, such as in warning buttons and warning banners.                                  |
| `background.warning.bold.hovered`            | #ddb30e     | #ddb30e    | yellow400        | yellow400       | `hover:bg-yellow-300`    | `dark:hover:bg-yellow-300`         | Hovered state of color.background.warning.bold                                                                                          |
| `background.warning.bold.pressed`            | #cf9f02     | #cf9f02    | yellow500        | yellow500       | `active:bg-yellow-400`   | `dark:active:bg-yellow-400`        | Pressed state of color.background.warning.bold                                                                                          |
| `background.warning.hovered`                 | #f5e989     | #533f04    | yellow200        | yellow900       | `hover:bg-yellow-100`    | `dark:hover:bg-yellow-800`         | Hovered state for color.background.warning                                                                                              |
| `background.warning.pressed`                 | #eed12b     | #7f5f01    | yellow300        | yellow800       | `active:bg-yellow-200`   | `dark:active:bg-yellow-700`        | Pressed state for color.background.warning                                                                                              |

## Text Colors

| Token                        | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class      | Usage                                                                                                               |
| ---------------------------- | ----------- | ---------- | ---------------- | --------------- | -------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `text`                       | #292a2e     | #bfc1c4    | neutral1000      | darkneutral900  | `text-neutral-900`   | `dark:text-neutral-800`  | Use for primary text, such as body copy, sentence case headers, and buttons.                                        |
| `text.accent.blue`           | #1558bc     | #8fb8f6    | blue800          | blue300         | `text-blue-700`      | `dark:text-blue-200`     | Use for blue text on subtlest and subtler blue accent backgrounds when there is no meaning tied to the color.       |
| `text.accent.blue.bolder`    | #123263     | #cfe1fd    | blue900          | blue200         | `text-blue-800`      | `dark:text-blue-100`     | Use for blue text on subtle blue accent backgrounds when there is no meaning tied to the color.                     |
| `text.accent.gray`           | #505258     | #a9abaf    | neutral800       | darkneutral800  | `text-neutral-700`   | `dark:text-neutral-700`  | Use for text on non-bold gray accent backgrounds, such as colored tags.                                             |
| `text.accent.gray.bolder`    | #1e1f21     | #e2e3e4    | neutral1100      | darkneutral1100 | `text-neutral-950`   | `dark:text-neutral-950`  | Use for text and icons on gray subtle accent backgrounds.                                                           |
| `text.accent.green`          | #216e4e     | #7ee2b8    | green800         | green300        | `text-green-700`     | `dark:text-green-200`    | Use for green text on subtlest and subtler green accent backgrounds when there is no meaning tied to the color.     |
| `text.accent.green.bolder`   | #164b35     | #baf3db    | green900         | green200        | `text-green-800`     | `dark:text-green-100`    | Use for green text on subtle green accent backgrounds when there is no meaning tied to the color.                   |
| `text.accent.lime`           | #4c6b1f     | #b3df72    | lime800          | lime300         | `text-lime-700`      | `dark:text-lime-200`     | Use for lime text on subtlest and subtler lime accent backgrounds when there is no meaning tied to the color.       |
| `text.accent.lime.bolder`    | #37471f     | #d3f1a7    | lime900          | lime200         | `text-lime-800`      | `dark:text-lime-100`     | Use for lime text on subtle lime accent backgrounds when there is no meaning tied to the color.                     |
| `text.accent.magenta`        | #943d73     | #f797d2    | magenta800       | magenta300      | `text-pink-700`      | `dark:text-pink-200`     | Use for magenta text on subtlest and subtler magenta accent backgrounds when there is no meaning tied to the color. |
| `text.accent.magenta.bolder` | #50253f     | #fdd0ec    | magenta900       | magenta200      | `text-pink-800`      | `dark:text-pink-100`     | Use for magenta text on subtle magenta accent backgrounds when there is no meaning tied to the color.               |
| `text.accent.orange`         | #9e4c00     | #fbc828    | orange800        | orange300       | `text-orange-700`    | `dark:text-orange-200`   | Use for orange text on subtlest and subtler orange accent backgrounds when there is no meaning tied to the color.   |
| `text.accent.orange.bolder`  | #693200     | #fce4a6    | orange900        | orange200       | `text-orange-800`    | `dark:text-orange-100`   | Use for orange text on subtle orange accent backgrounds when there is no meaning tied to the color.                 |
| `text.accent.purple`         | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`    | `dark:text-purple-200`   | Use for purple text on subtlest and subtler purple accent backgrounds when there is no meaning tied to the color.   |
| `text.accent.purple.bolder`  | #48245d     | #eed7fc    | purple900        | purple200       | `text-purple-800`    | `dark:text-purple-100`   | Use for purple text on subtle purple accent backgrounds when there is no meaning tied to the color.                 |
| `text.accent.red`            | #ae2e24     | #fd9891    | red800           | red300          | `text-red-700`       | `dark:text-red-200`      | Use for red text on subtlest and subtler red accent backgrounds when there is no meaning tied to the color.         |
| `text.accent.red.bolder`     | #5d1f1a     | #ffd5d2    | red900           | red200          | `text-red-800`       | `dark:text-red-100`      | Use for red text on subtle red accent backgrounds when there is no meaning tied to the color.                       |
| `text.accent.teal`           | #206a83     | #9dd9ee    | teal800          | teal300         | `text-teal-700`      | `dark:text-teal-200`     | Use for teal text on subtlest and subtler teal accent backgrounds when there is no meaning tied to the color.       |
| `text.accent.teal.bolder`    | #164555     | #c6edfb    | teal900          | teal200         | `text-teal-800`      | `dark:text-teal-100`     | Use for teal text on subtle teal accent backgrounds when there is no meaning tied to the color.                     |
| `text.accent.yellow`         | #7f5f01     | #eed12b    | yellow800        | yellow300       | `text-yellow-700`    | `dark:text-yellow-200`   | Use for yellow text on subtlest and subtler yellow accent backgrounds when there is no meaning tied to the color.   |
| `text.accent.yellow.bolder`  | #533f04     | #f5e989    | yellow900        | yellow200       | `text-yellow-800`    | `dark:text-yellow-100`   | Use for yellow text on subtle yellow accent backgrounds when there is no meaning tied to the color.                 |
| `text.brand`                 | #1868db     | #669df1    | blue700          | blue400         | `text-blue-600`      | `dark:text-blue-300`     | Use for text that reinforces our brand.                                                                             |
| `text.danger`                | #ae2e24     | #fd9891    | red800           | red300          | `text-red-700`       | `dark:text-red-200`      | Use for critical text, such as input field error messaging.                                                         |
| `text.disabled`              | #080f214A   | #e5e9f640  | neutral400a      | darkneutral400a | `text-neutral-300a`  | `dark:text-neutral-300a` | Use for text in a disabled state.                                                                                   |
| `text.discovery`             | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`    | `dark:text-purple-200`   | Use for text to emphasize change or something new, such as in new lozenges.                                         |
| `text.information`           | #1558bc     | #8fb8f6    | blue800          | blue300         | `text-blue-700`      | `dark:text-blue-200`     | Use for informative text or to communicate something is in progress, such as in-progress lozenges.                  |
| `text.inverse`               | #ffffff     | #1f1f21    | neutral0         | darkneutral100  | `text-neutral-0`     | `dark:text-neutral-50`   | Use for text on bold backgrounds.                                                                                   |
| `text.selected`              | #1868db     | #669df1    | blue700          | blue400         | `text-blue-600`      | `dark:text-blue-300`     | Use for text in selected or opened states, such as tabs and dropdown buttons.                                       |
| `text.subtle`                | #505258     | #a9abaf    | neutral800       | darkneutral800  | `text-neutral-700`   | `dark:text-neutral-700`  | Use for secondary text, such as navigation, subtle button links, input field labels, and all caps subheadings.      |
| `text.subtlest`              | #6b6e76     | #96999e    | neutral700       | darkneutral700  | `text-neutral-600`   | `dark:text-neutral-600`  | Use for tertiary text, such as meta-data, breadcrumbs, input field placeholder and helper text.                     |
| `text.success`               | #216e4e     | #7ee2b8    | green800         | green300        | `text-green-700`     | `dark:text-green-200`    | Use for text to communicate a favorable outcome, such as input field success messaging.                             |
| `text.warning`               | #9e4c00     | #eed12b    | orange800        | yellow300       | `text-orange-700`    | `dark:text-yellow-200`   | Use for text to emphasize caution, such as in moved lozenges.                                                       |
| `text.warning.inverse`       | #292a2e     | #1f1f21    | neutral1000      | darkneutral100  | `text-neutral-900`   | `dark:text-neutral-50`   | Use for text when on bold warning backgrounds.                                                                      |

## Icon Colors

| Token                  | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class           | Usage                                                                                                              |
| ---------------------- | ----------- | ---------- | ---------------- | --------------- | -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `icon`                 | #292a2e     | #cecfd2    | neutral1000      | darkneutral1000 | `text-neutral-900`   | `dark:text-dark-neutral-900`  | Use for icon-only buttons, or icons paired with color.text                                                         |
| `icon.accent.blue`     | #357de8     | #4688ec    | blue600          | blue500         | `text-blue-500`      | `dark:text-blue-400`          | Use for blue icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.    |
| `icon.accent.gray`     | #7d818a     | #7e8188    | neutral600       | darkneutral600  | `text-neutral-500`   | `dark:text-dark-neutral-500`  | Use for icons on non-bold gray accent backgrounds, such as file type icons.                                        |
| `icon.accent.green`    | #22a06b     | #2abb7f    | green600         | green500        | `text-green-500`     | `dark:text-green-400`         | Use for green icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.   |
| `icon.accent.lime`     | #6a9a23     | #82b536    | lime600          | lime500         | `text-lime-500`      | `dark:text-lime-400`          | Use for lime icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.    |
| `icon.accent.magenta`  | #cd519d     | #da62ac    | magenta600       | magenta500      | `text-pink-500`      | `dark:text-pink-400`          | Use for magenta icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons. |
| `icon.accent.orange`   | #e06c00     | #f68909    | orange600        | orange500       | `text-orange-500`    | `dark:text-orange-400`        | Use for orange icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.  |
| `icon.accent.purple`   | #af59e1     | #bf63f3    | purple600        | purple500       | `text-purple-500`    | `dark:text-purple-400`        | Use for purple icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.  |
| `icon.accent.red`      | #c9372c     | #e2483d    | red700           | red600          | `text-red-600`       | `dark:text-red-500`           | Use for red icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.     |
| `icon.accent.teal`     | #2898bd     | #42b2d7    | teal600          | teal500         | `text-teal-500`      | `dark:text-teal-400`          | Use for teal icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.    |
| `icon.accent.yellow`   | #b38600     | #eed12b    | yellow600        | yellow300       | `text-yellow-500`    | `dark:text-yellow-200`        | Use for yellow icons on non-bold backgrounds when there is no meaning tied to the color, such as file type icons.  |
| `icon.brand`           | #1868db     | #669df1    | blue700          | blue400         | `text-blue-600`      | `dark:text-blue-300`          | Use for icons that reinforce our brand.                                                                            |
| `icon.danger`          | #c9372c     | #f15b50    | red700           | red500          | `text-red-600`       | `dark:text-red-400`           | Use for icons communicating critical information, such as those used in error handing.                             |
| `icon.disabled`        | #080f214A   | #e5e9f640  | neutral400a      | darkneutral400a | `text-neutral-300a`  | `dark:text-dark-neutral-300a` | Use for icons in a disabled state.                                                                                 |
| `icon.discovery`       | #af59e1     | #bf63f3    | purple600        | purple500       | `text-purple-500`    | `dark:text-purple-400`        | Use for icons communicating change or something new, such as discovery section messages.                           |
| `icon.information`     | #357de8     | #4688ec    | blue600          | blue500         | `text-blue-500`      | `dark:text-blue-400`          | Use for icons communicating information or something in-progress, such as information section messages.            |
| `icon.inverse`         | #ffffff     | #1f1f21    | neutral0         | darkneutral100  | `text-neutral-0`     | `dark:text-dark-neutral-50`   | Use for icons on bold backgrounds.                                                                                 |
| `icon.selected`        | #1868db     | #669df1    | blue700          | blue400         | `text-blue-600`      | `dark:text-blue-300`          | Use for icons in selected or opened states, such as those used in dropdown buttons.                                |
| `icon.subtle`          | #505258     | #a9abaf    | neutral800       | darkneutral800  | `text-neutral-700`   | `dark:text-dark-neutral-700`  | Use for icons paired with color.text.subtle                                                                        |
| `icon.subtlest`        | #6b6e76     | #96999e    | neutral700       | darkneutral700  | `text-neutral-600`   | `dark:text-dark-neutral-600`  | Use for icons paired with color.text.subtlest                                                                      |
| `icon.success`         | #22a06b     | #2abb7f    | green600         | green500        | `text-green-500`     | `dark:text-green-400`         | Use for icons communicating a favorable outcome, such as those used in success section messaged.                   |
| `icon.warning`         | #e06c00     | #eed12b    | orange600        | yellow300       | `text-orange-500`    | `dark:text-yellow-200`        | Use for icons communicating caution, such as those used in warning section messages.                               |
| `icon.warning.inverse` | #292a2e     | #1f1f21    | neutral1000      | darkneutral100  | `text-neutral-900`   | `dark:text-dark-neutral-50`   | Use for icons when on bold warning backgrounds.                                                                    |

## Border Colors

| Token                   | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class  | Dark Tailwind Class             | Usage                                                                                                          |
| ----------------------- | ----------- | ---------- | ---------------- | --------------- | --------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `border`                | #1e1f2124   | #a6c5e229  | neutral300a      | darkneutral300a | `border-neutral-200a` | `dark:border-dark-neutral-200a` | Use to visually group or separate UI elements, such as flat cards or side panel dividers.                      |
| `border.accent.blue`    | #357de8     | #4688ec    | blue600          | blue500         | `border-blue-500`     | `dark:border-blue-400`          | Use for blue borders on non-bold backgrounds when there is no meaning tied to the color.                       |
| `border.accent.gray`    | #7d818a     | #7e8188    | neutral600       | darkneutral600  | `border-neutral-500`  | `dark:border-neutral-500`       | Use for borders on non-bold gray accent backgrounds.                                                           |
| `border.accent.green`   | #22a06b     | #2abb7f    | green600         | green500        | `border-green-500`    | `dark:border-green-400`         | Use for green borders on non-bold backgrounds when there is no meaning tied to the color.                      |
| `border.accent.lime`    | #6a9a23     | #82b536    | lime600          | lime500         | `border-lime-500`     | `dark:border-lime-400`          | Use for lime borders on non-bold backgrounds when there is no meaning tied to the color.                       |
| `border.accent.magenta` | #cd519d     | #da62ac    | magenta600       | magenta500      | `border-pink-500`     | `dark:border-pink-500`          | Use for magenta borders on non-bold backgrounds when there is no meaning tied to the color.                    |
| `border.accent.orange`  | #e06c00     | #f68909    | orange600        | orange500       | `border-orange-500`   | `dark:border-orange-400`        | Use for orange borders on non-bold backgrounds when there is no meaning tied to the color.                     |
| `border.accent.purple`  | #af59e1     | #bf63f3    | purple600        | purple500       | `border-purple-500`   | `dark:border-purple-500`        | Use for purple borders on non-bold backgrounds when there is no meaning tied to the color.                     |
| `border.accent.red`     | #e2483d     | #f15b50    | red600           | red500          | `border-red-500`      | `dark:border-red-400`           | Use for red borders on non-bold backgrounds when there is no meaning tied to the color.                        |
| `border.accent.teal`    | #2898bd     | #42b2d7    | teal600          | teal500         | `border-teal-500`     | `dark:border-teal-400`          | Use for teal borders on non-bold backgrounds when there is no meaning tied to the color.                       |
| `border.accent.yellow`  | #b38600     | #cf9f02    | yellow600        | yellow500       | `border-yellow-500`   | `dark:border-yellow-400`        | Use for yellow borders on non-bold backgrounds when there is no meaning tied to the color.                     |
| `border.bold`           | #7d818a     | #7e8188    | neutral600       | darkneutral600  | `border-neutral-500`  | `dark:border-dark-neutral-500`  | A neutral border option that passes min 3:1 contrast ratios.                                                   |
| `border.brand`          | #1868db     | #669df1    | blue700          | blue400         | `border-blue-600`     | `dark:border-blue-300`          | Use for borders or visual indicators of elements that reinforce our brand, such as logos or primary buttons.   |
| `border.danger`         | #e2483d     | #f15b50    | red600           | red500          | `border-red-500`      | `dark:border-red-400`           | Use for borders communicating critical information, such as the borders on invalid text fields.                |
| `border.disabled`       | #0515240f   | #ceced912  | neutral200a      | darkneutral200a | `border-neutral-100a` | `dark:border-dark-neutral-100a` | Use for borders of elements in a disabled state.                                                               |
| `border.discovery`      | #af59e1     | #bf63f3    | purple600        | purple500       | `border-purple-500`   | `dark:border-purple-400`        | Use for borders communicating change or something new, such as the borders in onboarding spotlights.           |
| `border.focused`        | #4688ec     | #8fb8f6    | blue500          | blue300         | `border-blue-400`     | `dark:border-blue-200`          | Use for focus rings of elements in a focus state.                                                              |
| `border.information`    | #357de8     | #4688ec    | blue600          | blue500         | `border-blue-500`     | `dark:border-blue-400`          | Use for borders communicating information or something in-progress.                                            |
| `border.input`          | #8c8f97     | #7e8188    | neutral500       | darkneutral600  | `border-neutral-400`  | `dark:border-dark-neutral-400`  | Use for borders of form UI elements, such as text fields, checkboxes, and radio buttons.                       |
| `border.inverse`        | #ffffff     | #18191a    | neutral0         | darkneutral0    | `border-neutral-0`    | `dark:border-dark-neutral-0`    | Use for borders on bold backgrounds.                                                                           |
| `border.selected`       | #1868db     | #669df1    | blue700          | blue400         | `border-blue-600`     | `dark:border-blue-300`          | Use for borders or visual indicators of elements in a selected or opened state, such as in tabs or menu items. |
| `border.success`        | #22a06b     | #2abb7f    | green600         | green500        | `border-green-500`    | `dark:border-green-400`         | Use for borders communicating a favorable outcome, such as the borders on validated text fields.               |
| `border.warning`        | #e06c00     | #cf9f02    | orange600        | yellow500       | `border-orange-500`   | `dark:border-yellow-400`        | Use for borders communicating caution.                                                                         |

## Chart Colors

| Token                            | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class     | Dark Tailwind Class                | Usage                                                                           |
| -------------------------------- | ----------- | ---------- | ---------------- | --------------- | ------------------------ | ---------------------------------- | ------------------------------------------------------------------------------- |
| `chart.blue.bold`                | #4688ec     | #357de8    | blue500          | blue600         | `text-blue-400`          | `dark:text-blue-500`               | For data visualisation only.                                                    |
| `chart.blue.bold.hovered`        | #357de8     | #4688ec    | blue600          | blue500         | `hover:text-blue-500`    | `dark:hover:text-blue-400`         | Hovered state of color.chart.blue.bold.                                         |
| `chart.blue.bolder`              | #357de8     | #4688ec    | blue600          | blue500         | `text-blue-500`          | `dark:text-blue-400`               | For data visualisation only.                                                    |
| `chart.blue.bolder.hovered`      | #1868db     | #669df1    | blue700          | blue400         | `hover:text-blue-600`    | `dark:hover:text-blue-300`         | Hovered state of color.chart.blue.bolder.                                       |
| `chart.blue.boldest`             | #1558bc     | #8fb8f6    | blue800          | blue300         | `text-blue-700`          | `dark:text-blue-200`               | For data visualisation only.                                                    |
| `chart.blue.boldest.hovered`     | #123263     | #cfe1fd    | blue900          | blue200         | `hover:text-blue-800`    | `dark:hover:text-blue-100`         | Hovered state of color.chart.blue.boldest.                                      |
| `chart.brand`                    | #357de8     | #4688ec    | blue600          | blue500         | `text-blue-500`          | `dark:text-blue-400`               | Our primary color for data visualisation. Use when only one color is required.  |
| `chart.brand.hovered`            | #1868db     | #669df1    | blue700          | blue400         | `hover:text-blue-600`    | `dark:hover:text-blue-300`         | Hovered state of color.chart.brand.                                             |
| `chart.categorical.1`            | #2898bd     | #2898bd    | teal600          | teal600         | `text-teal-500`          | `dark:text-teal-500`               | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.1.hovered`    | #227d9b     | #42b2d7    | teal700          | teal500         | `hover:text-teal-600`    | `dark:hover:text-teal-400`         | Hovered state of color.chart.categorical.1.                                     |
| `chart.categorical.2`            | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`        | `dark:text-purple-200`             | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.2.hovered`    | #48245d     | #eed7fc    | purple900        | purple200       | `hover:text-purple-800`  | `dark:hover:text-purple-100`       | Hovered state of color.chart.categorical.2.                                     |
| `chart.categorical.3`            | #e06c00     | #e06c00    | orange600        | orange600       | `text-orange-500`        | `dark:text-orange-500`             | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.3.hovered`    | #bd5b00     | #f68909    | orange700        | orange500       | `hover:text-orange-600`  | `dark:hover:text-orange-400`       | Hovered state of color.chart.categorical.3.                                     |
| `chart.categorical.4`            | #943d73     | #f797d2    | magenta800       | magenta300      | `text-pink-700`          | `dark:text-pink-200`               | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.4.hovered`    | #50253f     | #fdd0ec    | magenta900       | magenta200      | `hover:text-pink-800`    | `dark:hover:text-pink-100`         | Hovered state of color.chart.categorical.4.                                     |
| `chart.categorical.5`            | #123263     | #cfe1fd    | blue900          | blue200         | `text-blue-800`          | `dark:text-blue-100`               | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.5.hovered`    | #1c2b42     | #e9f2fe    | blue1000         | blue100         | `hover:text-blue-900`    | `dark:hover:text-blue-50`          | Hovered state of color.chart.categorical.5.                                     |
| `chart.categorical.6`            | #bf63f3     | #af59e1    | purple500        | purple600       | `text-purple-400`        | `dark:text-purple-500`             | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.6.hovered`    | #af59e1     | #bf63f3    | purple600        | purple500       | `hover:text-purple-500`  | `dark:hover:text-purple-400`       | Hovered state of color.chart.categorical.6.                                     |
| `chart.categorical.7`            | #50253f     | #fdd0ec    | magenta900       | magenta200      | `text-pink-800`          | `dark:text-pink-100`               | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.7.hovered`    | #3d2232     | #ffecf8    | magenta1000      | magenta100      | `hover:text-pink-900`    | `dark:hover:text-pink-50`          | Hovered state of color.chart.categorical.7.                                     |
| `chart.categorical.8`            | #9e4c00     | #fbc828    | orange800        | orange300       | `text-orange-700`        | `dark:text-orange-200`             | For data visualisation only. Follow numbered sequence.                          |
| `chart.categorical.8.hovered`    | #693200     | #fce4a6    | orange900        | orange200       | `hover:text-orange-800`  | `dark:hover:text-orange-100`       | Hovered state of color.chart.categorical.8.                                     |
| `chart.danger`                   | #f15b50     | #e2483d    | red500           | red600          | `text-red-400`           | `dark:text-red-500`                | For data visualisation communicating negative information, such as 'off track'. |
| `chart.danger.bold`              | #ae2e24     | #fd9891    | red800           | red300          | `text-red-700`           | `dark:text-red-200`                | A stronger emphasis option of color.chart.danger.                               |
| `chart.danger.bold.hovered`      | #5d1f1a     | #ffd5d2    | red900           | red200          | `hover:text-red-800`     | `dark:hover:text-red-100`          | Hovered state of color.chart.danger.bold.                                       |
| `chart.danger.hovered`           | #e2483d     | #f15b50    | red600           | red500          | `hover:text-red-500`     | `dark:hover:text-red-400`          | Hovered state of color.chart.danger.                                            |
| `chart.discovery`                | #bf63f3     | #af59e1    | purple500        | purple600       | `text-purple-400`        | `dark:text-purple-500`             | For data visualisation communicating 'new' statuses.                            |
| `chart.discovery.bold`           | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`        | `dark:text-purple-200`             | A stronger emphasis option of color.chart.discovery.                            |
| `chart.discovery.bold.hovered`   | #48245d     | #eed7fc    | purple900        | purple200       | `hover:text-purple-800`  | `dark:hover:text-purple-100`       | Hovered state of color.chart.discovery.bold.                                    |
| `chart.discovery.hovered`        | #af59e1     | #bf63f3    | purple600        | purple500       | `hover:text-purple-500`  | `dark:hover:text-purple-400`       | Hovered state of color.chart.discovery.                                         |
| `chart.gray.bold`                | #8c8f97     | #7e8188    | neutral500       | darkneutral600  | `text-neutral-400`       | `dark:text-dark-neutral-500`       | For data visualisation only.                                                    |
| `chart.gray.bold.hovered`        | #7d818a     | #96999e    | neutral600       | darkneutral700  | `hover:text-neutral-500` | `dark:hover:text-dark-neutral-600` | Hovered state of color.chart.gray.bold.                                         |
| `chart.gray.bolder`              | #7d818a     | #96999e    | neutral600       | darkneutral700  | `text-neutral-500`       | `dark:text-dark-neutral-600`       | For data visualisation only.                                                    |
| `chart.gray.bolder.hovered`      | #6b6e76     | #a9abaf    | neutral700       | darkneutral800  | `hover:text-neutral-600` | `dark:hover:text-dark-neutral-700` | Hovered state of color.chart.gray.bolder.                                       |
| `chart.gray.boldest`             | #505258     | #a9abaf    | neutral800       | darkneutral800  | `text-neutral-700`       | `dark:text-dark-neutral-700`       | For data visualisation only.                                                    |
| `chart.gray.boldest.hovered`     | #3b3d42     | #bfc1c4    | neutral900       | darkneutral900  | `hover:text-neutral-800` | `dark:hover:text-dark-neutral-800` | Hovered state of color.chart.gray.boldest.                                      |
| `chart.green.bold`               | #22a06b     | #2abb7f    | green600         | green500        | `text-green-500`         | `dark:text-green-400`              | For data visualisation only.                                                    |
| `chart.green.bold.hovered`       | #1f845a     | #4bce97    | green700         | green400        | `hover:text-green-600`   | `dark:hover:text-green-300`        | Hovered state of color.chart.green.bold.                                        |
| `chart.green.bolder`             | #1f845a     | #4bce97    | green700         | green400        | `text-green-600`         | `dark:text-green-300`              | For data visualisation only.                                                    |
| `chart.green.bolder.hovered`     | #216e4e     | #7ee2b8    | green800         | green300        | `hover:text-green-700`   | `dark:hover:text-green-200`        | Hovered state of color.chart.green.bolder.                                      |
| `chart.green.boldest`            | #216e4e     | #7ee2b8    | green800         | green300        | `text-green-700`         | `dark:text-green-200`              | For data visualisation only.                                                    |
| `chart.green.boldest.hovered`    | #164b35     | #baf3db    | green900         | green200        | `hover:text-green-800`   | `dark:hover:text-green-100`        | Hovered state of color.chart.green.boldest.                                     |
| `chart.information`              | #4688ec     | #357de8    | blue500          | blue600         | `text-blue-400`          | `dark:text-blue-500`               | For data visualisation communicating low priority or in-progress statuses.      |
| `chart.information.bold`         | #1558bc     | #8fb8f6    | blue800          | blue300         | `text-blue-700`          | `dark:text-blue-200`               | A stronger emphasis option of color.chart.information.                          |
| `chart.information.bold.hovered` | #123263     | #cfe1fd    | blue900          | blue200         | `hover:text-blue-800`    | `dark:hover:text-blue-100`         | Hovered state of color.chart.information.bold.                                  |
| `chart.information.hovered`      | #357de8     | #4688ec    | blue600          | blue500         | `hover:text-blue-500`    | `dark:hover:text-blue-400`         | Hovered state of color.chart.information.                                       |
| `chart.lime.bold`                | #6a9a23     | #82b536    | lime600          | lime500         | `text-lime-500`          | `dark:text-lime-400`               | For data visualisation only.                                                    |
| `chart.lime.bold.hovered`        | #5b7f24     | #94c748    | lime700          | lime400         | `hover:text-lime-600`    | `dark:hover:text-lime-300`         | Hovered state of color.chart.lime.bold.                                         |
| `chart.lime.bolder`              | #5b7f24     | #94c748    | lime700          | lime400         | `text-lime-600`          | `dark:text-lime-300`               | For data visualisation only.                                                    |
| `chart.lime.bolder.hovered`      | #4c6b1f     | #b3df72    | lime800          | lime300         | `hover:text-lime-700`    | `dark:hover:text-lime-200`         | Hovered state of color.chart.lime.bolder.                                       |
| `chart.lime.boldest`             | #4c6b1f     | #b3df72    | lime800          | lime300         | `text-lime-700`          | `dark:text-lime-200`               | For data visualisation only.                                                    |
| `chart.lime.boldest.hovered`     | #37471f     | #d3f1a7    | lime900          | lime200         | `hover:text-lime-800`    | `dark:hover:text-lime-100`         | Hovered state of color.chart.lime.boldest.                                      |
| `chart.magenta.bold`             | #da62ac     | #cd519d    | magenta500       | magenta600      | `text-pink-400`          | `dark:text-pink-500`               | For data visualisation only.                                                    |
| `chart.magenta.bold.hovered`     | #cd519d     | #da62ac    | magenta600       | magenta500      | `hover:text-pink-500`    | `dark:hover:text-pink-400`         | Hovered state of color.chart.magenta.bold.                                      |
| `chart.magenta.bolder`           | #cd519d     | #da62ac    | magenta600       | magenta500      | `text-pink-500`          | `dark:text-pink-400`               | For data visualisation only.                                                    |
| `chart.magenta.bolder.hovered`   | #ae4787     | #e774bb    | magenta700       | magenta400      | `hover:text-pink-600`    | `dark:hover:text-pink-300`         | Hovered state of color.chart.magenta.bolder.                                    |
| `chart.magenta.boldest`          | #943d73     | #f797d2    | magenta800       | magenta300      | `text-pink-700`          | `dark:text-pink-200`               | For data visualisation only.                                                    |
| `chart.magenta.boldest.hovered`  | #50253f     | #fdd0ec    | magenta900       | magenta200      | `hover:text-pink-800`    | `dark:hover:text-pink-100`         | Hovered state of color.chart.magenta.boldest.                                   |
| `chart.neutral`                  | #8c8f97     | #7e8188    | neutral500       | darkneutral600  | `text-neutral-400`       | `dark:text-dark-neutral-500`       | A secondary color for data visualisation or to communicate 'to-do' statues.     |
| `chart.neutral.hovered`          | #7d818a     | #96999e    | neutral600       | darkneutral700  | `hover:text-neutral-500` | `dark:hover:text-dark-neutral-600` | Hovered state of color.chart.neutral.                                           |
| `chart.orange.bold`              | #e06c00     | #f68909    | orange600        | orange500       | `text-orange-500`        | `dark:text-orange-400`             | For data visualisation only.                                                    |
| `chart.orange.bold.hovered`      | #bd5b00     | #fca700    | orange700        | orange400       | `hover:text-orange-600`  | `dark:hover:text-orange-300`       | Hovered state of color.chart.orange.bold.                                       |
| `chart.orange.bolder`            | #bd5b00     | #fca700    | orange700        | orange400       | `text-orange-600`        | `dark:text-orange-300`             | For data visualisation only.                                                    |
| `chart.orange.bolder.hovered`    | #9e4c00     | #fbc828    | orange800        | orange300       | `hover:text-orange-700`  | `dark:hover:text-orange-200`       | Hovered state of color.chart.orange.bolder.                                     |
| `chart.orange.boldest`           | #9e4c00     | #fbc828    | orange800        | orange300       | `text-orange-700`        | `dark:text-orange-200`             | For data visualisation only.                                                    |
| `chart.orange.boldest.hovered`   | #693200     | #fce4a6    | orange900        | orange200       | `hover:text-orange-800`  | `dark:hover:text-orange-100`       | Hovered state of color.chart.orange.boldest.                                    |
| `chart.purple.bold`              | #bf63f3     | #af59e1    | purple500        | purple600       | `text-purple-400`        | `dark:text-purple-500`             | For data visualisation only.                                                    |
| `chart.purple.bold.hovered`      | #af59e1     | #bf63f3    | purple600        | purple500       | `hover:text-purple-500`  | `dark:hover:text-purple-400`       | Hovered state of color.chart.purple.bold.                                       |
| `chart.purple.bolder`            | #af59e1     | #bf63f3    | purple600        | purple500       | `text-purple-500`        | `dark:text-purple-400`             | For data visualisation only.                                                    |
| `chart.purple.bolder.hovered`    | #964ac0     | #c97cf4    | purple700        | purple400       | `hover:text-purple-600`  | `dark:hover:text-purple-300`       | Hovered state of color.chart.purple.bolder.                                     |
| `chart.purple.boldest`           | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`        | `dark:text-purple-200`             | For data visualisation only.                                                    |
| `chart.purple.boldest.hovered`   | #48245d     | #eed7fc    | purple900        | purple200       | `hover:text-purple-800`  | `dark:hover:text-purple-100`       | Hovered state of color.chart.purple.boldest.                                    |
| `chart.red.bold`                 | #f15b50     | #e2483d    | red500           | red600          | `text-red-400`           | `dark:text-red-500`                | For data visualisation only.                                                    |
| `chart.red.bold.hovered`         | #e2483d     | #f15b50    | red600           | red500          | `hover:text-red-500`     | `dark:hover:text-red-400`          | Hovered state of color.chart.red.bold.                                          |
| `chart.red.bolder`               | #e2483d     | #f15b50    | red600           | red500          | `text-red-500`           | `dark:text-red-400`                | For data visualisation only.                                                    |
| `chart.red.bolder.hovered`       | #c9372c     | #f87168    | red700           | red400          | `hover:text-red-600`     | `dark:hover:text-red-300`          | Hovered state of color.chart.red.bolder.                                        |
| `chart.red.boldest`              | #ae2e24     | #fd9891    | red800           | red300          | `text-red-700`           | `dark:text-red-200`                | For data visualisation only.                                                    |
| `chart.red.boldest.hovered`      | #5d1f1a     | #ffd5d2    | red900           | red200          | `hover:text-red-800`     | `dark:hover:text-red-100`          | Hovered state of color.chart.red.boldest.                                       |
| `chart.success`                  | #22a06b     | #2abb7f    | green600         | green500        | `text-green-500`         | `dark:text-green-400`              | For data visualisation communicating positive information, such as 'on track'.  |
| `chart.success.bold`             | #216e4e     | #7ee2b8    | green800         | green300        | `text-green-700`         | `dark:text-green-200`              | A stronger emphasis option of color.chart.success.                              |
| `chart.success.bold.hovered`     | #164b35     | #baf3db    | green900         | green200        | `hover:text-green-800`   | `dark:hover:text-green-100`        | Hovered state of color.chart.success.bold.                                      |
| `chart.success.hovered`          | #1f845a     | #4bce97    | green700         | green400        | `hover:text-green-600`   | `dark:hover:text-green-300`        | Hovered state of color.chart.success.                                           |
| `chart.teal.bold`                | #2898bd     | #42b2d7    | teal600          | teal500         | `text-teal-500`          | `dark:text-teal-400`               | For data visualisation only.                                                    |
| `chart.teal.bold.hovered`        | #227d9b     | #6cc3e0    | teal700          | teal400         | `hover:text-teal-600`    | `dark:hover:text-teal-300`         | Hovered state of color.chart.teal.bold.                                         |
| `chart.teal.bolder`              | #227d9b     | #6cc3e0    | teal700          | teal400         | `text-teal-600`          | `dark:text-teal-300`               | For data visualisation only.                                                    |
| `chart.teal.bolder.hovered`      | #206a83     | #9dd9ee    | teal800          | teal300         | `hover:text-teal-700`    | `dark:hover:text-teal-200`         | Hovered state of color.chart.teal.bolder.                                       |
| `chart.teal.boldest`             | #206a83     | #9dd9ee    | teal800          | teal300         | `text-teal-700`          | `dark:text-teal-200`               | For data visualisation only.                                                    |
| `chart.teal.boldest.hovered`     | #164555     | #c6edfb    | teal900          | teal200         | `hover:text-teal-800`    | `dark:hover:text-teal-100`         | Hovered state of color.chart.teal.boldest.                                      |
| `chart.warning`                  | #b38600     | #cf9f02    | yellow600        | yellow500       | `text-yellow-500`        | `dark:text-yellow-400`             | For data visualisation communicating caution, such as 'at risk' statuses.       |
| `chart.warning.bold`             | #7f5f01     | #eed12b    | yellow800        | yellow300       | `text-yellow-700`        | `dark:text-yellow-200`             | A stronger emphasis option of color.chart.warning.                              |
| `chart.warning.bold.hovered`     | #533f04     | #f5e989    | yellow900        | yellow200       | `hover:text-yellow-800`  | `dark:hover:text-yellow-100`       | Hovered state of color.chart.warning.bold.                                      |
| `chart.warning.hovered`          | #946f00     | #ddb30e    | yellow700        | yellow400       | `hover:text-yellow-600`  | `dark:hover:text-yellow-300`       | Hovered state of color.chart.warning.                                           |
| `chart.yellow.bold`              | #b38600     | #cf9f02    | yellow600        | yellow500       | `text-yellow-500`        | `dark:text-yellow-400`             | For data visualisation only.                                                    |
| `chart.yellow.bold.hovered`      | #946f00     | #ddb30e    | yellow700        | yellow400       | `hover:text-yellow-600`  | `dark:hover:text-yellow-300`       | Hovered state of color.chart.yellow.bold.                                       |
| `chart.yellow.bolder`            | #946f00     | #ddb30e    | yellow700        | yellow400       | `text-yellow-600`        | `dark:text-yellow-300`             | For data visualisation only.                                                    |
| `chart.yellow.bolder.hovered`    | #7f5f01     | #eed12b    | yellow900        | yellow300       | `hover:text-yellow-800`  | `dark:hover:text-yellow-200`       | Hovered state of color.chart.yellow.bolder.                                     |
| `chart.yellow.boldest`           | #7f5f01     | #eed12b    | yellow800        | yellow300       | `text-yellow-700`        | `dark:text-yellow-200`             | For data visualisation only.                                                    |
| `chart.yellow.boldest.hovered`   | #533f04     | #f5e989    | yellow900        | yellow200       | `hover:text-yellow-800`  | `dark:hover:text-yellow-100`       | Hovered state of color.chart.yellow.boldest.                                    |

## Link Colors

| Token                  | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class    | Usage                                                                             |
| ---------------------- | ----------- | ---------- | ---------------- | --------------- | -------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `link`                 | #1868db     | #669df1    | blue700          | blue400         | `text-blue-600`      | `dark:text-blue-300`   | Use for links in a default or hovered state. Add an underline for hovered states. |
| `link.pressed`         | #1558bc     | #8fb8f6    | blue800          | blue300         | `text-blue-700`      | `dark:text-blue-200`   | Use for links in a pressed state.                                                 |
| `link.visited`         | #803fa5     | #d8a0f7    | purple800        | purple300       | `text-purple-700`    | `dark:text-purple-200` | Use for visited links.                                                            |
| `link.visited.pressed` | #48245d     | #eed7fc    | purple900        | purple200       | `text-purple-800`    | `dark:text-purple-100` | Use for visited links in a pressed state.                                         |

## Skeleton Colors

| Token             | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class         | Usage                                                          |
| ----------------- | ----------- | ---------- | ---------------- | --------------- | -------------------- | --------------------------- | -------------------------------------------------------------- |
| `skeleton`        | #1e1f210F   | #a1bdd914  | neutral200a      | darkneutral200a | `bg-neutral-200a`    | `dark:bg-dark-neutral-200a` | Use for skeleton loading states                                |
| `skeleton.subtle` | #1e1f2108   | #bcd6f00A  | neutral100a      | darkneutral100a | `bg-neutral-50a`     | `dark:bg-dark-neutral-50a`  | Use for the pulse or shimmer effect in skeleton loading states |

## Interaction Colors

| Token                 | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class | Usage                                                                                                                   |
| --------------------- | ----------- | ---------- | ---------------- | --------------- | -------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `interaction.hovered` | #00000029   | #ffffff33  | N/A              | N/A             | `bg-black/16`        | `dark:bg-white/20`  | Use as a background overlay for elements in a hovered state when their background color cannot change, such as avatars. |
| `interaction.pressed` | #00000052   | #ffffff5c  | N/A              | N/A             | `bg-black/32`        | `dark:bg-white/36`  | Use as a background overlay for elements in a pressed state when their background color cannot change, such as avatars. |

## Blanket Colors

| Token              | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class | Dark Tailwind Class   | Usage                                                                                                                                          |
| ------------------ | ----------- | ---------- | ---------------- | --------------- | -------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blanket`          | #050c1f75   | #10121499  | neutral500a      | N/A             | `bg-neutral-500a`    | `dark:bg-[#10121499]` | Use for the screen overlay that appears with modal dialogs                                                                                     |
| `blanket.danger`   | #ef5c4814   | #e3493514  | N/A              | N/A             | `bg-[#ef5c4814]`     | `dark:bg-[#e3493514]` | Use as an overlay to communicate danger states when a simple background color change isn't possible, such as deletion of Editor block elements |
| `blanket.selected` | #4688ec14   | #357de814  | N/A              | N/A             | `bg-[#4688ec14]`     | `dark:bg-[#357de814]` | Use as an overlay to communicate selected states when a simple background color change isn't possible, such as in Editor block elements        |

## Elevation Shadow

| Token                                 | Light Value                                                       | Dark Value                                                                              | Light Base Token | Dark Base Token | Light Tailwind Class                   | Dark Tailwind Class                                   | Usage                                                                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------- | --------------- | -------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elevation.shadow.raised`             | `0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)`  | `0 0 0 rgba(0, 0, 0, 0), 0 1px 1px rgba(3, 4, 4, 0.5), 0 0 1px rgba(3, 4, 4, 0.5)`      | N/A              | N/A             | `shadow-md ring-1 ring-neutral-800/31` | `dark:shadow-lg dark:ring-1 dark:ring-neutral-200/50` | Use for the box shadow of raised card elements, such as Jira cards on a Kanban board. Combine with elevation.surface.raised                                       |
| `elevation.shadow.overflow`           | `0 0 8px rgba(9, 30, 66, 0.16), 0 0 1px rgba(9, 30, 66, 0.12)`    | `0 0 12px rgba(3, 4, 4, 0.56), 0 0 1px rgba(3, 4, 4, 0.5)`                              | N/A              | N/A             | `shadow-lg ring-1 ring-neutral-800/12` | `dark:shadow-xl dark:ring-1 dark:ring-neutral-200/50` | Use to create a shadow when content scrolls under other content.                                                                                                  |
| `elevation.shadow.overflow.perimeter` | `0 0 0 1px rgba(9, 30, 66, 0.12)`                                 | `0 0 0 1px rgba(3, 4, 4, 0.5)`                                                          | N/A              | N/A             | `ring-1 ring-neutral-800/12`           | `dark:ring-1 dark:ring-neutral-200/50`                | Use only when elevation.shadow.overflow is not technically feasible to implement. Pair with elevation.shadow.overflow.spread to replicate the overflow shadow.    |
| `elevation.shadow.overflow.spread`    | `0 0 0 1px rgba(9, 30, 66, 0.16)`                                 | `0 0 0 1px rgba(3, 4, 4, 0.56)`                                                         | N/A              | N/A             | `ring-1 ring-neutral-800/16`           | `dark:ring-1 dark:ring-neutral-200/56`                | Use only when elevation.shadow.overflow is not technically feasible to implement. Pair with elevation.shadow.overflow.perimeter to replicate the overflow shadow. |
| `elevation.shadow.overlay`            | `0 8px 12px rgba(9, 30, 66, 0.15), 0 0 1px rgba(9, 30, 66, 0.31)` | `0 0 0 rgba(57, 66, 74, 1), 0 8px 12px rgba(3, 4, 4, 0.36), 0 0 1px rgba(3, 4, 4, 0.5)` | N/A              | N/A             | `shadow-xl ring-1 ring-neutral-800/31` | `dark:shadow-xl dark:ring-1 dark:ring-neutral-600`    | Use for the box shadow of elements that sit on top of the UI, such as modals, dropdown menus, flags, and inline dialogs. Combine with elevation.surface.overlay   |

## Elevation Surface

| Token                               | Light Value | Dark Value | Light Base Token | Dark Base Token | Light Tailwind Class    | Dark Tailwind Class               | Usage                                                                                                                                                                                                                                                                 |
| ----------------------------------- | ----------- | ---------- | ---------------- | --------------- | ----------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `elevation.surface`                 | #ffffff     | #1f1f21    | neutral0         | darkneutral100  | `bg-neutral-0`          | `dark:bg-dark-neutral-50`         | Use as the primary background for the UI.                                                                                                                                                                                                                             |
| `elevation.surface.hovered`         | #f0f1f2     | #242528    | neutral200       | darkneutral200  | `hover:bg-neutral-100`  | `dark:hover:bg-dark-neutral-100`  | Hovered state of elevation.surface                                                                                                                                                                                                                                    |
| `elevation.surface.pressed`         | #dddee1     | #2b2c2f    | neutral300       | darkneutral250  | `active:bg-neutral-200` | `dark:active:bg-dark-neutral-150` | Pressed state of elevation.surface                                                                                                                                                                                                                                    |
| `elevation.surface.overlay`         | #ffffff     | #2b2c2f    | neutral0         | darkneutral250  | `bg-neutral-0`          | `dark:bg-dark-neutral-150`        | Use for the background of elements that sit on top of they UI, such as modals, dialogs, dropdown menus, floating toolbars, and floating single-action buttons. Also use for the background of raised cards in a dragged state. Combine with elevation.shadow.overlay. |
| `elevation.surface.overlay.hovered` | #f0f1f2     | #303134    | neutral200       | darkneutral300  | `hover:bg-neutral-100`  | `dark:hover:bg-dark-neutral-200`  | Hovered state of elevation.surface.overlay                                                                                                                                                                                                                            |
| `elevation.surface.overlay.pressed` | #dddee1     | #3d3f43    | neutral300       | darkneutral350  | `active:bg-neutral-200` | `dark:active:bg-dark-neutral-250` | Pressed state of elevation.surface.overlay                                                                                                                                                                                                                            |
| `elevation.surface.raised`          | #ffffff     | #242528    | neutral0         | darkneutral200  | `bg-neutral-0`          | `dark:bg-dark-neutral-100`        | Use for the background of cards that can be moved, such as Jira cards on a Kanban board. Combine with elevation.shadow.raised.                                                                                                                                        |
| `elevation.surface.raised.hovered`  | #f0f1f2     | #2b2c2f    | neutral200       | darkneutral250  | `hover:bg-neutral-100`  | `dark:hover:bg-dark-neutral-150`  | Hovered state of elevation.surface.raised                                                                                                                                                                                                                             |
| `elevation.surface.raised.pressed`  | #dddee1     | #303134    | neutral300       | darkneutral300  | `active:bg-neutral-200` | `dark:active:bg-dark-neutral-200` | Pressed state of elevation.surface.raised                                                                                                                                                                                                                             |
| `elevation.surface.sunken`          | #f8f8f8     | #18191a    | neutral100       | darkneutral0    | `bg-neutral-50`         | `dark:bg-dark-neutral-0`          | A secondary background for the UI commonly used for grouping items, such as Jira cards in columns.                                                                                                                                                                    | ## Opacity |

| Token              | Value | Tailwind Class | Usage                                               |
| ------------------ | ----- | -------------- | --------------------------------------------------- |
| `opacity.disabled` | 0.4   | `opacity-40`   | Apply to images when in a disabled state.           |
| `opacity.loading`  | 0.2   | `opacity-20`   | Apply to content that sits under a loading spinner. |

## Utility

| Token                               | Light Value | Dark Value | Light Base Token | Dark Base Token | Tailwind Class Light Value | Tailwind Class Dark Value | Usage                                                                                                                                  |
| ----------------------------------- | ----------- | ---------- | ---------------- | --------------- | -------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `utility.elevation.surface.current` | #ffffff     | #1f1f21    | neutral0         | darkneutral100  | `bg-neutral-0`             | `dark:bg-dark-neutral-0`  | A dynamic token that represents the current surface color set by a parent element. It defaults to the 'elevation.surface' token value. |

## Spacing (`--spacing: 4px`)

| Token                | Value | Tailwind Class | Usage                                                                |
| -------------------- | ----- | -------------- | -------------------------------------------------------------------- |
| `space.0`            | 0px   | `p-0`          | Equates to `0`. Use for resetting default spacing styles.            |
| `space.025`          | 2px   | `p-0.5`        | Use for small and compact pieces of UI.                              |
| `space.050`          | 4px   | `p-1`          | Use for small and compact pieces of UI.                              |
| `space.075`          | 6px   | `p-1.5`        | Use for small and compact pieces of UI.                              |
| `space.100`          | 8px   | `p-2`          | Use for small and compact pieces of UI.                              |
| `space.150`          | 12px  | `p-3`          | Use for larger and less dense pieces of UI.                          |
| `space.200`          | 16px  | `p-4`          | Use for larger and less dense pieces of UI.                          |
| `space.250`          | 20px  | `p-5`          | Use for larger and less dense pieces of UI.                          |
| `space.300`          | 24px  | `p-6`          | Use for larger and less dense pieces of UI.                          |
| `space.400`          | 32px  | `p-8`          | Use for the largest pieces of UI and for layout elements.            |
| `space.500`          | 40px  | `p-10`         | Use for the largest pieces of UI and for layout elements.            |
| `space.600`          | 48px  | `p-12`         | Use for the largest pieces of UI and for layout elements.            |
| `space.800`          | 64px  | `p-16`         | Use for the largest pieces of UI and for layout elements.            |
| `space.1000`         | 80px  | `p-20`         | Use for the largest pieces of UI and for layout elements.            |
| `space.negative.025` | -2px  | `-m-0.5`       | Use to negate parent whitespace or overlap small pieces of UI.       |
| `space.negative.050` | -4px  | `-m-1`         | Use to negate parent whitespace or overlap small pieces of UI.       |
| `space.negative.075` | -6px  | `-m-1.5`       | Use to negate parent whitespace or overlap small pieces of UI.       |
| `space.negative.100` | -8px  | `-m-2`         | Use to negate parent whitespace or overlap small pieces of UI.       |
| `space.negative.150` | -12px | `-m-3`         | Use to negate parent whitespace or overlap larger pieces of UI.      |
| `space.negative.200` | -16px | `-m-4`         | Use to negate parent whitespace or overlap larger pieces of UI.      |
| `space.negative.250` | -20px | `-m-5`         | Use to negate parent whitespace or overlap larger pieces of UI.      |
| `space.negative.300` | -24px | `-m-6`         | Use to negate parent whitespace or overlap larger pieces of UI.      |
| `space.negative.400` | -32px | `-m-8`         | Use to negate parent whitespace or overlap the largest pieces of UI. |

## Font Size

| Token            | Value    | Base Token        | Tailwind Class | Usage                                          |
| ---------------- | -------- | ----------------- | -------------- | ---------------------------------------------- |
| `font.size.code` | 0.875em  | ds-font-size-code | `text-sm`      | For code text elements. Relative to font size. |
| `font.size.12`   | 0.75rem  | ds-font-size12    | `text-xs`      | Extra small text size (12px)                   |
| `font.size.14`   | 0.875rem | ds-font-size14    | `text-sm`      | Small text size (14px)                         |
| `font.size.16`   | 1rem     | ds-font-size16    | `text-base`    | Base text size (16px)                          |
| `font.size.20`   | 1.25rem  | ds-font-size20    | `text-lg`      | Large text size (20px)                         |
| `font.size.24`   | 1.5rem   | ds-font-size24    | `text-xl`      | Extra large text size (24px)                   |
| `font.size.28`   | 1.75rem  | ds-font-size28    | `text-2xl`     | Double extra large text size (28px)            |
| `font.size.32`   | 2rem     | ds-font-size32    | `text-3xl`     | Triple extra large text size (32px)            |

## Font Family

| Token                       | Value                                                                                                                 | Tailwind Class       | Usage                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------- |
| `font.family.body`          | "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif  | `font-sans`          | For our default product UI body and UI headingtext. |
| `font.family.heading`       | "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif  | `font-sans`          | For our default product UI heading text.            |
| `font.family.code`          | "Atlassian Mono", ui-monospace, Menlo, "Segoe UI Mono", "Ubuntu Mono", monospace                                      | `font-mono`          | For representing code only.                         |
| `font.family.brand.body`    | "Charlie Text", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif    | `font-brand-body`    | For our brand body text. Uses Charlie Text.         |
| `font.family.brand.heading` | "Charlie Display", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif | `font-brand-heading` | For our brand heading text. Uses Charlie Display.   |

## Font Weight

| Token                  | Value | Tailwind Class  | Usage                                                                                               |
| ---------------------- | ----- | --------------- | --------------------------------------------------------------------------------------------------- |
| `font.weight.regular`  | 400   | `font-normal`   | Default font weight for body text styles.                                                           |
| `font.weight.medium`   | 500   | `font-medium`   | For all text that may appear beside iconography, such as in a button.                               |
| `font.weight.semibold` | 600   | `font-semibold` | Use with caution as fallback fonts do not support this font weight and will default to bold weight. |
| `font.weight.bold`     | 653   | `font-bold`     | Use sparingly for emphasising text, such as in a lozenge.                                           |

## Typography Styles (`--leading-<number> = line-height: calc(var(--spacing) * <number>)`)

| Token                  | Value                                                                                                                                            | Tailwind Class                                   | Usage                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `font.body`            | normal 400 0.875rem/1.25rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif | `text-sm font-normal leading-snug font-sans`     | Short text, such as descriptions in flags, or labels in buttons. The default size for text in components, and short content. |
| `font.body.small`      | normal 400 0.75rem/1rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-xs font-normal leading-tight font-sans`    | Secondary level content such as fine print or semantic messaging. Use sparingly.                                             |
| `font.body.large`      | normal 400 1rem/1.5rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif      | `text-base font-normal leading-normal font-sans` | Long-form content such as blogs. The default size for reading text in long paragraphs.                                       |
| `font.heading.xxsmall` | normal 653 0.75rem/1rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-xs font-bold leading-tight font-sans`      | Headers in fine print or tight spaces. Use sparingly.                                                                        |
| `font.heading.xsmall`  | normal 653 0.875rem/1.25rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif | `text-sm font-bold leading-snug font-sans`       | Headers in small components where space is limited, such as flags.                                                           |
| `font.heading.small`   | normal 653 1rem/1.25remx "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif    | `text-base font-bold leading-snug font-sans`     | Headers in small components where space is limited, such as flags.                                                           |
| `font.heading.medium`  | normal 653 1.25rem/1.5rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif   | `text-lg font-bold leading-normal font-sans`     | Headers in large components, such as modal dialogs.                                                                          |
| `font.heading.large`   | normal 653 1.5rem/1.75rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif   | `text-xl font-bold leading-relaxed font-sans`    | Product page titles such as forms.                                                                                           |
| `font.heading.xlarge`  | normal 653 1.75rem/2rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-2xl font-bold leading-loose font-sans`     | Brand and marketing content.                                                                                                 |
| `font.heading.xxlarge` | normal 653 2rem/2.25rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-3xl font-bold leading-[2.25rem] font-sans` | Brand and marketing content.                                                                                                 |
| `font.metric.large`    | normal 653 1.75rem/2rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-2xl font-bold leading-loose font-sans`     | Use to emphasize a number within a large donut.                                                                              |
| `font.metric.medium`   | normal 653 1.5rem/1.75rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif   | `text-xl font-bold leading-relaxed font-sans`    | Use to emphasize a number within a medium donut.                                                                             |
| `font.metric.small`    | normal 653 1rem/1.25rem "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif     | `text-base font-bold leading-snug font-sans`     | Use to emphasize a number and words in single-value tiles, or small donuts.                                                  |
| `font.code`            | normal 400 0.875em/1 "Atlassian Mono", ui-monospace, Menlo, "Segoe UI Mono", "Ubuntu Mono", monospace                                            | `text-sm font-normal leading-none font-mono`     | For use in code block only.                                                                                                  |

## Border Radius

| Token                  | Value | Base Token   | Tailwind Class  | Usage                    |
| ---------------------- | ----- | ------------ | --------------- | ------------------------ |
| `border.radius.0`      | 0     | radius0      | `rounded-none`  | No border radius         |
| `border.radius.050`    | 2px   | radius050    | `rounded-xs`    | Selection indicators     |
| `border.radius.075`    | 3px   | radius075    | `rounded-[3px]` | Default radius/inputs    |
| `border.radius.100`    | 4px   | radius100    | `rounded-sm`    | Buttons                  |
| `border.radius.150`    | 6px   | radius150    | `rounded-md`    | Buttons                  |
| `border.radius.200`    | 8px   | radius200    | `rounded-lg`    | Cards/containers         |
| `border.radius.300`    | 12px  | radius300    | `rounded-xl`    | Modals/containers        |
| `border.radius.400`    | 16px  | radius400    | `rounded-2xl`   | Bigger modals/containers |
| `border.radius.circle` | 50%   | radiuscircle | `rounded-full`  | Circular elements        |

## Border Widths

| Token                  | Value | Tailwind Class | Usage               |
| ---------------------- | ----- | -------------- | ------------------- |
| `border.width`         | 1px   | `border`       | Default width       |
| `border.width.outline` | 2px   | `border-2`     | Focus/active states |

## Line Height Tokens

| Token            | Value          | Tailwind Class      | Usage                                                       |
| ---------------- | -------------- | ------------------- | ----------------------------------------------------------- |
| `line.height.1`  | 1              | `leading-none`      | Height of a line box will be exactly equal to the font-size |
| `line.height.16` | 1rem (16px)    | `leading-tight`     | Line height for small text, 16px                            |
| `line.height.20` | 1.25rem (20px) | `leading-snug`      | Line height for body text, 20px                             |
| `line.height.24` | 1.5rem (24px)  | `leading-normal`    | Line height for body large text, 24px                       |
| `line.height.28` | 1.75rem (28px) | `leading-relaxed`   | Line height for headings, 28px                              |
| `line.height.32` | 2rem (32px)    | `leading-loose`     | Line height for large headings, 32px                        |
| `line.height.36` | 2.25rem (36px) | `leading-[2.25rem]` | Line height for extra large headings, 36px                  |

## Letter Spacing Tokens

| Token                | Value    | Tailwind Class        | Usage                                                       |
| -------------------- | -------- | --------------------- | ----------------------------------------------------------- |
| `letter.spacing.0`   | 0        | `tracking-normal`     | Normal letter spacing, no adjustment                        |
| `letter.spacing.100` | -0.003em | `tracking-tight`      | Slightly tighter letter spacing for improved readability    |
| `letter.spacing.200` | -0.006em | `tracking-tighter`    | Moderately tighter letter spacing for dense text layouts    |
| `letter.spacing.300` | -0.008em | `tracking-[-0.008em]` | Tighter letter spacing for headings and emphasized text     |
| `letter.spacing.400` | -0.01em  | `tracking-[-0.01em]`  | Tightest letter spacing for large headings and display text |

## Motion Duration

| Token                  | Value | Tailwind Class | Usage                               |
| ---------------------- | ----- | -------------- | ----------------------------------- |
| `duration.none`        | 0ms   | `duration-0`   | No transition                       |
| `duration.small`       | 100ms | `duration-100` | Enter transition (fast)             |
| `duration.medium`      | 350ms | `duration-350` | Enter transition (moderate/default) |
| `duration.large`       | 700ms | `duration-700` | Enter transition (slow)             |
| `duration.exit.small`  | 50ms  | `duration-50`  | Exit transition (fast)              |
| `duration.exit.medium` | 175ms | `duration-175` | Exit transition (moderate)          |
| `duration.exit.large`  | 350ms | `duration-350` | Exit transition (slow)              |

## Motion Easing

| Token            | Value                        | Tailwind Class                   | Usage                                                    |
| ---------------- | ---------------------------- | -------------------------------- | -------------------------------------------------------- |
| `ease.in.out`    | `cubic-bezier(0.15,1,0.3,1)` | `ease-in-out`                    | Natural entrance & exit (default base)                   |
| `ease.out`       | `cubic-bezier(0.2,0,0,1)`    | `ease-out`                       | Starts quickly and then slows down at the end (entrance) |
| `ease.in`        | `cubic-bezier(0.8,0,0,0.8)`  | `ease-in`                        | Start slowly and then speeds up at the end (exit)        |
| `ease.in.40.out` | `cubic-bezier(0.4,0,0,1)`    | `ease-[cubic-bezier(0.4,0,0,1)]` | Moderate ease-in start with ease-out end                 |
| `ease.in.60.out` | `cubic-bezier(0.6,0,0,1)`    | `ease-[cubic-bezier(0.6,0,0,1)]` | Strong ease-in start with ease-out end                   |
| `ease.in.80.out` | `cubic-bezier(0.8,0,0,1)`    | `ease-[cubic-bezier(0.8,0,0,1)]` | Very strong ease-in start with ease-out end              |
| `ease.linear`    | `cubic-bezier(0,0,1,1)`      | `ease-linear`                    | Constant speed motion                                    |

## Z-Index

| Token          | Value | Tailwind Class | Usage                                                                      |
| -------------- | ----- | -------------- | -------------------------------------------------------------------------- |
| `z.card`       | 100   | `z-100`        | Use for cards and raised content that appears above the base layer         |
| `z.navigation` | 200   | `z-200`        | Use for navigation elements like headers, sidebars, and navigation bars    |
| `z.dialog`     | 300   | `z-300`        | Use for dialog boxes and inline dialogs                                    |
| `z.layer`      | 400   | `z-400`        | Use for general layered content that needs to appear above most elements   |
| `z.blanket`    | 500   | `z-500`        | Use for blanket overlays that cover the entire screen                      |
| `z.modal`      | 510   | `z-510`        | Use for modal dialogs that appear above blankets                           |
| `z.flag`       | 600   | `z-600`        | Use for flag notifications and banner messages                             |
| `z.spotlight`  | 700   | `z-700`        | Use for spotlight overlays and onboarding highlights                       |
| `z.tooltip`    | 800   | `z-800`        | Use for tooltips and other ephemeral content that appears above everything |

## Animation (Custom Tailwind Classes)

### Slide Animations

| Token                             | Value                                                                       | Tailwind Class                 | Description                                    |
| --------------------------------- | --------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------- |
| `animation.slide.in.bottom`       | `slide-in-from-bottom var(--motion-duration-medium) var(--motion-ease-out)` | `animate-slide-in-bottom`      | Element slides up from below viewport          |
| `animation.slide.in.bottom.small` | `slide-in-from-bottom var(--motion-duration-small) var(--motion-ease-out)`  | `animate-slide-in-bottom-fast` | Element slides up from below viewport (fast)   |
| `animation.slide.in.bottom.large` | `slide-in-from-bottom var(--motion-duration-large) var(--motion-ease-out)`  | `animate-slide-in-bottom-slow` | Element slides up from below viewport (slow)   |
| `animation.slide.in.top`          | `slide-in-from-top var(--motion-duration-medium) var(--motion-ease-out)`    | `animate-slide-in-top`         | Element slides down from above viewport        |
| `animation.slide.in.top.small`    | `slide-in-from-top var(--motion-duration-small) var(--motion-ease-out)`     | `animate-slide-in-top-fast`    | Element slides down from above viewport (fast) |
| `animation.slide.in.top.large`    | `slide-in-from-top var(--motion-duration-large) var(--motion-ease-out)`     | `animate-slide-in-top-slow`    | Element slides down from above viewport (slow) |
| `animation.slide.in.left`         | `slide-in-from-left var(--motion-duration-medium) var(--motion-ease-out)`   | `animate-slide-in-left`        | Element slides in from left side               |
| `animation.slide.in.left.small`   | `slide-in-from-left var(--motion-duration-small) var(--motion-ease-out)`    | `animate-slide-in-left-fast`   | Element slides in from left side (fast)        |
| `animation.slide.in.left.large`   | `slide-in-from-left var(--motion-duration-large) var(--motion-ease-out)`    | `animate-slide-in-left-slow`   | Element slides in from left side (slow)        |
| `animation.slide.in.right`        | `slide-in-from-right var(--motion-duration-medium) var(--motion-ease-out)`  | `animate-slide-in-right`       | Element slides in from right side              |
| `animation.slide.in.right.small`  | `slide-in-from-right var(--motion-duration-small) var(--motion-ease-out)`   | `animate-slide-in-right-fast`  | Element slides in from right side (fast)       |
| `animation.slide.in.right.large`  | `slide-in-from-right var(--motion-duration-large) var(--motion-ease-out)`   | `animate-slide-in-right-slow`  | Element slides in from right side (slow)       |

### Exit Animations

| Token                              | Value                                                                          | Tailwind Class                  | Description                         |
| ---------------------------------- | ------------------------------------------------------------------------------ | ------------------------------- | ----------------------------------- |
| `animation.slide.out.bottom`       | `slide-out-to-bottom var(--motion-duration-exit-medium) var(--motion-ease-in)` | `animate-slide-out-bottom`      | Element slides down and out         |
| `animation.slide.out.bottom.small` | `slide-out-to-bottom var(--motion-duration-exit-small) var(--motion-ease-in)`  | `animate-slide-out-bottom-fast` | Element slides down and out (fast)  |
| `animation.slide.out.bottom.large` | `slide-out-to-bottom var(--motion-duration-exit-large) var(--motion-ease-in)`  | `animate-slide-out-bottom-slow` | Element slides down and out (slow)  |
| `animation.slide.out.top`          | `slide-out-to-top var(--motion-duration-exit-medium) var(--motion-ease-in)`    | `animate-slide-out-top`         | Element slides up and out           |
| `animation.slide.out.top.small`    | `slide-out-to-top var(--motion-duration-exit-small) var(--motion-ease-in)`     | `animate-slide-out-top-fast`    | Element slides up and out (fast)    |
| `animation.slide.out.top.large`    | `slide-out-to-top var(--motion-duration-exit-large) var(--motion-ease-in)`     | `animate-slide-out-top-slow`    | Element slides up and out (slow)    |
| `animation.slide.out.left`         | `slide-out-to-left var(--motion-duration-exit-medium) var(--motion-ease-in)`   | `animate-slide-out-left`        | Element slides left and out         |
| `animation.slide.out.left.small`   | `slide-out-to-left var(--motion-duration-exit-small) var(--motion-ease-in)`    | `animate-slide-out-left-fast`   | Element slides left and out (fast)  |
| `animation.slide.out.left.large`   | `slide-out-to-left var(--motion-duration-exit-large) var(--motion-ease-in)`    | `animate-slide-out-left-slow`   | Element slides left and out (slow)  |
| `animation.slide.out.right`        | `slide-out-to-right var(--motion-duration-exit-medium) var(--motion-ease-in)`  | `animate-slide-out-right`       | Element slides right and out        |
| `animation.slide.out.right.small`  | `slide-out-to-right var(--motion-duration-exit-small) var(--motion-ease-in)`   | `animate-slide-out-right-fast`  | Element slides right and out (fast) |
| `animation.slide.out.right.large`  | `slide-out-to-right var(--motion-duration-exit-large) var(--motion-ease-in)`   | `animate-slide-out-right-slow`  | Element slides right and out (slow) |

### Fade Animations

| Token                      | Value                                                               | Tailwind Class          | Description                       |
| -------------------------- | ------------------------------------------------------------------- | ----------------------- | --------------------------------- |
| `animation.fade.in`        | `fade-in var(--motion-duration-medium) var(--motion-ease-out)`      | `animate-fade-in`       | Element fades in smoothly         |
| `animation.fade.in.small`  | `fade-in var(--motion-duration-small) var(--motion-ease-out)`       | `animate-fade-in-fast`  | Element fades in smoothly (fast)  |
| `animation.fade.in.large`  | `fade-in var(--motion-duration-large) var(--motion-ease-out)`       | `animate-fade-in-slow`  | Element fades in smoothly (slow)  |
| `animation.fade.out`       | `fade-out var(--motion-duration-exit-medium) var(--motion-ease-in)` | `animate-fade-out`      | Element fades out smoothly        |
| `animation.fade.out.small` | `fade-out var(--motion-duration-exit-small) var(--motion-ease-in)`  | `animate-fade-out-fast` | Element fades out smoothly (fast) |
| `animation.fade.out.large` | `fade-out var(--motion-duration-exit-large) var(--motion-ease-in)`  | `animate-fade-out-slow` | Element fades out smoothly (slow) |

### Zoom Animations

| Token                      | Value                                                               | Tailwind Class          | Description                                 |
| -------------------------- | ------------------------------------------------------------------- | ----------------------- | ------------------------------------------- |
| `animation.zoom.in`        | `zoom-in var(--motion-duration-medium) var(--motion-ease-out)`      | `animate-zoom-in`       | Element scales up from 95% to 100%          |
| `animation.zoom.in.small`  | `zoom-in var(--motion-duration-small) var(--motion-ease-out)`       | `animate-zoom-in-fast`  | Element scales up from 95% to 100% (fast)   |
| `animation.zoom.in.large`  | `zoom-in var(--motion-duration-large) var(--motion-ease-out)`       | `animate-zoom-in-slow`  | Element scales up from 95% to 100% (slow)   |
| `animation.zoom.out`       | `zoom-out var(--motion-duration-exit-medium) var(--motion-ease-in)` | `animate-zoom-out`      | Element scales down from 100% to 95%        |
| `animation.zoom.out.small` | `zoom-out var(--motion-duration-exit-small) var(--motion-ease-in)`  | `animate-zoom-out-fast` | Element scales down from 100% to 95% (fast) |
| `animation.zoom.out.large` | `zoom-out var(--motion-duration-exit-large) var(--motion-ease-in)`  | `animate-zoom-out-slow` | Element scales down from 100% to 95% (slow) |

### Shrink Animations

| Token                        | Value                                                                 | Tailwind Class            | Description                                |
| ---------------------------- | --------------------------------------------------------------------- | ------------------------- | ------------------------------------------ |
| `animation.shrink.out`       | `shrink-out var(--motion-duration-exit-medium) var(--motion-ease-in)` | `animate-shrink-out`      | Element shrinks to 0px width/height        |
| `animation.shrink.out.small` | `shrink-out var(--motion-duration-exit-small) var(--motion-ease-in)`  | `animate-shrink-out-fast` | Element shrinks to 0px width/height (fast) |
| `animation.shrink.out.large` | `shrink-out var(--motion-duration-exit-large) var(--motion-ease-in)`  | `animate-shrink-out-slow` | Element shrinks to 0px width/height (slow) |

### Staggered Animations

| Token                          | Value                                                               | Tailwind Class              | Description                                            |
| ------------------------------ | ------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------ |
| `animation.staggered.in`       | `staggered-in var(--motion-duration-medium) var(--motion-ease-out)` | `animate-staggered-in`      | Element enters with staggered delay (grid-based)       |
| `animation.staggered.in.small` | `staggered-in var(--motion-duration-small) var(--motion-ease-out)`  | `animate-staggered-in-fast` | Element enters with staggered delay (grid-based, fast) |
| `animation.staggered.in.large` | `staggered-in var(--motion-duration-large) var(--motion-ease-out)`  | `animate-staggered-in-slow` | Element enters with staggered delay (grid-based, slow) |

### Customize Animate Classes

```css
@import "tailwindcss";
@theme {
	/* Slide In Animations */
	--animate-slide-in-bottom: slide-in-from-bottom var(--motion-duration-medium) var(--motion-ease-out);
	--animate-slide-in-top: slide-in-from-top var(--motion-duration-medium) var(--motion-ease-out);
	--animate-slide-in-left: slide-in-from-left var(--motion-duration-medium) var(--motion-ease-out);
	--animate-slide-in-right: slide-in-from-right var(--motion-duration-medium) var(--motion-ease-out);

	/* Slide In From Bottom */
	@keyframes slide-in-from-bottom {
		0% {
			transform: tranneutralY(100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			transform: tranneutralY(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Slide In From Top */
	@keyframes slide-in-from-top {
		0% {
			transform: tranneutralY(-100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			transform: tranneutralY(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Slide In From Left */
	@keyframes slide-in-from-left {
		0% {
			transform: tranneutralX(-100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			transform: tranneutralX(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Slide In From Right */
	@keyframes slide-in-from-right {
		0% {
			transform: tranneutralX(100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			transform: tranneutralX(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Slide Out Animations */
	--animate-slide-out-bottom: slide-out-to-bottom var(--motion-duration-exit-medium) var(--motion-ease-in);
	--animate-slide-out-top: slide-out-to-top var(--motion-duration-exit-medium) var(--motion-ease-in);
	--animate-slide-out-left: slide-out-to-left var(--motion-duration-exit-medium) var(--motion-ease-in);
	--animate-slide-out-right: slide-out-to-right var(--motion-duration-exit-medium) var(--motion-ease-in);

	/* Slide Out To Bottom */
	@keyframes slide-out-to-bottom {
		0% {
			transform: tranneutralY(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			transform: tranneutralY(100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Slide Out To Top */
	@keyframes slide-out-to-top {
		0% {
			transform: tranneutralY(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			transform: tranneutralY(-100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Slide Out To Left */
	@keyframes slide-out-to-left {
		0% {
			transform: tranneutralX(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			transform: tranneutralX(-100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Slide Out To Right */
	@keyframes slide-out-to-right {
		0% {
			transform: tranneutralX(0);
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			transform: tranneutralX(100%);
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Fade Animations */
	--animate-fade-in: fade-in var(--motion-duration-medium) var(--motion-ease-out);
	--animate-fade-out: fade-out var(--motion-duration-exit-medium) var(--motion-ease-in);

	/* Fade In */
	@keyframes fade-in {
		0% {
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Fade Out */
	@keyframes fade-out {
		0% {
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Zoom Animations */
	--animate-zoom-in: zoom-in var(--motion-duration-medium) var(--motion-ease-out);
	--animate-zoom-out: zoom-out var(--motion-duration-exit-medium) var(--motion-ease-in);

	/* Zoom In */
	@keyframes zoom-in {
		0% {
			transform: scale(0.95);
			opacity: 0;
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			transform: scale(1);
			opacity: 1;
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* Zoom Out */
	@keyframes zoom-out {
		0% {
			transform: scale(1);
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			transform: scale(0.95);
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Shrink Animations */
	--animate-shrink-out: shrink-out var(--motion-duration-exit-medium) var(--motion-ease-in);

	/* Shrink Out */
	@keyframes shrink-out {
		0% {
			width: auto;
			height: auto;
			margin: 0;
			opacity: 1;
			animation-timing-function: var(--motion-ease-in);
		}
		100% {
			width: 0px;
			height: 0px;
			margin: 0px;
			opacity: 0;
			animation-timing-function: var(--motion-ease-in);
		}
	}

	/* Staggered Animations */
	--animate-staggered-in: staggered-in var(--motion-duration-medium) var(--motion-ease-out);

	/* Staggered In */
	@keyframes staggered-in {
		0% {
			opacity: 0;
			transform: tranneutralY(20px);
			animation-timing-function: var(--motion-ease-out);
		}
		100% {
			opacity: 1;
			transform: tranneutralY(0);
			animation-timing-function: var(--motion-ease-out);
		}
	}

	/* 
    
    **Example Implementation: CSS-only approach with nth-child delays:**

    .staggered-container > * {
        animation: staggered-in var(--motion-duration-medium) var(--motion-ease-out);
        animation-fill-mode: both;
    }

    .staggered-container > *:nth-child(1) {
        animation-delay: 0ms;
    }
    .staggered-container > *:nth-child(2) {
        animation-delay: 50ms;
    }
    .staggered-container > *:nth-child(3) {
        animation-delay: 100ms;
    }
    .staggered-container > *:nth-child(4) {
        animation-delay: 150ms;
    }
    .staggered-container > *:nth-child(5) {
        animation-delay: 200ms;
    }
    
    // Continue for more items as needed

    */
}
```
