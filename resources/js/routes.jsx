import { Home, Profile, SignIn, SignUp } from "@/Pages";

export const routes = [
    {
        name: "home",
        path: "/home",
        element: <Home />,
    },
    {
        name: "About Us",
        path: "/profile",
        element: <Profile />,
    },
    {
        name: "Events",
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        name: "Team",
        path: "/sign-up",
        element: <SignUp />,
    },
];

export default routes;
