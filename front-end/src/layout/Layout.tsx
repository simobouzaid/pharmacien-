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
            <footer>
           <p className="bg-amber-200 text-center"> 2025</p>
            </footer>
        </>
    )
}
