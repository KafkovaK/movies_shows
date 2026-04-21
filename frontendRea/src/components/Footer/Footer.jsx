import { FiGithub, FiTwitter } from 'react-icons/fi';
import "./Footer.css"

// footer component
function Footer() {
    return(
        <footer id={"footer"} className={"footer"}>
            <div className={"footer-divider"}></div>
            <div className={"footer-top"}>
                {/* web logo and small description */}
                <div className={"footer-brand"}>
                    <div className={"footer-logo"}>
                        <span className={"footer-logo"}>⚙ 404://stream</span>
                    </div>
                    <div className={"footer-desc"}>
                        <p>This is a website for cinematic</p>
                        <p>exploration. Stream, review and</p>
                        <p>build your movie database.</p>
                    </div>
                </div>

                {/* links to documentation */}
                <div className={"footer-links"}>
                    <h4 className={"footer-links-title"}>PROTOCOL</h4>
                    <a href={"#"}>/terms_of_service/</a>
                    <a href={"#"}>/privacy_policy/</a>
                    <a href={"#"}>/api_docs/</a>
                </div>

                {/* contacts for GitHub and Twitter */}
                <div className={"footer-contact"}>
                    <h4 className={"footer-contact-title"}>UPLINK</h4>
                    <div className={"footer-icons"}>
                        <a href={"#"}> <FiGithub/></a>
                        <a href={"#"}> <FiTwitter/></a>
                    </div>
                </div>
            </div>
            {/* copyright */}
            <div className={"footer-divider"}></div>
            <div className={"footer-copyright"}>
                <p>© 2026 - Karolína Kafková | 404://stream</p>
            </div>
        </footer>
    )
}

export default Footer;