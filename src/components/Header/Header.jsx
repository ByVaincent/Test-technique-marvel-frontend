import NavigationLink from "../NavigationLink"


import ("./header.css")


const Header = () => {
return <header>
        <div className="container">
            <section className="top-header">
                <div className="logo">
                    <img src="marvel_logo.svg" alt="Logo de Marvel" />
                </div>
                <div className="login-signup">
                    Login/Signup
                </div>

            </section>
            <nav>
            <NavigationLink text={"Accueil"} target={"/"}/>
            <NavigationLink text={"Personnages"} target={"/characters"}/>
            <NavigationLink text={"Comics"} target={"/comics"}/>
            </nav>

        </div>
</header>
}
export default Header