# Calculator (WIP)
 
![Calculator image](https://cdn-cloudflare.ga/assets/misc/calc.png)

# Features

* Awesome on switch with light effect.
* 30 second auto off switch.
* Shows current arithmetic operator to be applied to calculation.
* Continues with operation as long as numbers and operations are input into the button pad.

# Known bugs

* The decimal indicator, '.' does not function right now.
* App miscalcs under certain conditions
* Result display overflow running over edges in the case fo large demical numbers

# Coming improvements 

* Key stroking the calculator buttons instead of needing to click them.

---
## Deployment 

deployed to azure container registry running as a node:12 container;

* endpoint: http://calcapp-container.eastus.azurecontainer.io:8080

docker hub image : cliffenator/calculator-app
