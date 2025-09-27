import CarteHome from "../components/CarteHome"
import CartProfile from "../components/CartProfile"

export default function Home() {
    document.title = 'home'





    return <>
        <div className="grid grid-cols-3">
                <CartProfile  />
                 <CarteHome />
        </div>
    </>
}