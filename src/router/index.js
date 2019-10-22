import VueRouter from "vue-router";

import LaunchDetail from "../components/views/LaunchDetail";
import PastLaunches from "../components/views/PastLaunches";
import NextLaunch from "../components/views/NextLaunch";
import Rockets from "../components/views/Rockets";
import Rocket from "../components/Rocket";
import MissionDetail from "../components/views/MissionDetail";
import Home from "../components/views/Home";
import LaunchPads from "../components/views/LaunchPads";
import LandingPads from "../components/views/LandingPads";
import Roadster from "../components/views/Roadster";
import CatchAll from "../components/CatchAll";

const router = new VueRouter({
  routes: [
    {
      name: "landing-pads",
      path: "/landing-pads",
      component: LandingPads
    },
    {
      name: "launch-pads",
      path: "/launch-pads",
      component: LaunchPads
    },
    {
      name: "rocket-details",
      path: "/rocket/:rocketId",
      component: Rocket,
      props: true
    },
    {
      name: "roadster",
      path: "/roadster",
      component: Roadster
    },
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "launch-detail",
      path: "/launch-detail/:flightNumber",
      props: true,
      component: LaunchDetail
    },
    {
      name: "mission-details",
      path: "/mission/:mission_id",
      props: true,
      component: MissionDetail
    },
    {
      name: "past-launches",
      path: "/launches",
      props: false,
      component: PastLaunches
    },
    {
      name: "next-launch",
      path: "/launches/next",
      component: NextLaunch
    },
    {
      name: "rockets",
      path: "/rockets",
      component: Rockets
    },

    {
      name: "catch-all",
      path: "*",
      component: CatchAll
    }
  ]
});

export default router;
