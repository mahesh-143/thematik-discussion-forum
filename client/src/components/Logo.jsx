import { Box, Image } from "@chakra-ui/react"
import thematickLogo from "../assets/thematick.svg"

const Logo = () => {
  return <Image src={thematickLogo} id="logoImage" minW="7em" maxW="8em" />
}

export default Logo
