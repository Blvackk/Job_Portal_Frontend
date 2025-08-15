import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaFacebook,
  FaSquareInstagram,

  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div>
          {/* <img src="/logo.png" alt="logo" /> */}
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>2496/44, Chitnis Nagar, Nagpur, Maharashtra 440024, India</li>
            <li>pratiklagishetty1002@gmail.com</li>
            <li>+91 8007884002</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li to={"/"}>
              <Link>Home</Link>
            </li>
            <li to={"/jobs"}>
              <Link>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"https://www.facebook.com/pratik.lagishetty/"}>
                <span>
                  <FaFacebook />
                </span>
                <span>Facebook</span>
              </Link>
            </li>
            <li>
              <Link to={"https://www.instagram.com/theslumdog_/"}>
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            
            <li>
              <Link to={"https://www.linkedin.com/in/pratik-lagishetty-a74b2826b/"}>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2025. All Rights Reserved By JOBHUNT
      </div>
    </>
  );
};

export default Footer;