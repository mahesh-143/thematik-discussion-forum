import { Box, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import thematickLogo from "../assets/thematick.svg"

const Logo = () => {
  return <Link to="/"><Image src={thematickLogo} id="logoImage" minW="7em" maxW="8em" /></Link>
}

export default Logo
