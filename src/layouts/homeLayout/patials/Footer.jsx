import React from "react";
import Logo from "../../../assets/images/logo-white.png";
import { Link } from "react-router-dom";
import IconCycle from "../../../assets/Icon/IconCycle";
import { IconBird, IconFacebook, IconGit, IconInstagram } from "../../../assets/Icon/Icon";
import Button from "../../../components/button/Button";
export default function Footer() {
    return (
        <div className="footer-homepage">
            <div className="layout">
                <div className="flex-space  py-5 border-b-2 border-gray-400">
                    <div className="">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex">
                            <Link to={"help"}>
                                <p>Help</p>
                            </Link>
                            <p>/</p>
                            <Link to={"privacy"}>
                                <p>Privacy Policy</p>
                            </Link>
                        </div>
                        <div className="icon flex gap-2">
                            <IconCycle className="flex-center">
                                <IconFacebook />
                            </IconCycle>
                            <IconCycle className="flex-center">
                                <IconBird />
                            </IconCycle>
                            <IconCycle className="flex-center">
                                <IconInstagram />
                            </IconCycle>
                            <IconCycle className="flex-center">
                                <IconGit />
                            </IconCycle>
                        </div>
                    </div>
                </div>
                <div className="footer-bot py-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                        <div className=" flex flex-col gap-3">
                            <div>
                                {" "}
                                <h3 className="mb-5">Buy movie tickets easily with Aovis system nationwide</h3>
                                <Button bgColor="var(--orange)" color="white" width="50%" height="40px">
                                    GET YOUR TICKET
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4>
                                <strong>Movies</strong>
                            </h4>
                            <div className="flex flex-col gap-4">
                                <Link to={"#"}>Action</Link>
                                <Link to={"#"}>Adventure</Link>
                                <Link to={"#"}>Animation</Link>
                                <Link to={"#"}>Comedy</Link>
                                <Link to={"#"}>Crime</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4>
                                <strong>Links</strong>
                            </h4>
                            <div className="flex flex-col gap-4">
                                <Link to={"#"}>About</Link>
                                <Link to={"#"}>My Account</Link>
                                <Link to={"#"}>News</Link>
                                <Link to={"#"}>Latest Events</Link>
                                <Link to={"#"}>Contact</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4>
                                <strong>Newsletter</strong>
                            </h4>
                            <p>Subscribe to Leitmotif newsletter this very day.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 text-center py-4">© Copyright 2023 by Ovatheme.com</div>
        </div>
    );
}
