import React from 'react';
import "../Styles/Navstyle.css";
import Menu from "./Menu"

const Base =({
    title='Jkart',
    children,
   
})=>{
    return(
        <>
       <Menu/>
        <div>
                <div>{children}</div>
                <footer>
                    <div className="contact">
                        <div className="queries">
                            <p>if you have any queries feel free to contact us here!</p>
                        </div>
                        <a href="mailto:jaswanthvaithiswaran@gmail.com">
                            <button>Contact us</button>
                        </a>
                    </div>
                    <div className="Techstack">
                        <p>This site is built with MERN stack</p>
                    </div>
                </footer>
            </div></>
    )
}
export default Base;