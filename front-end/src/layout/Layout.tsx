import { Outlet } from "react-router-dom";
import BarreNavigation from "./BarreNavigation";


export default function layout() {
    return (
        <>
            <header>
              <BarreNavigation />
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="flex flex-col justify-end">
           <p className="bg-amber-300 text-center "> 2025</p>
            </footer>
        </>
    )
}
