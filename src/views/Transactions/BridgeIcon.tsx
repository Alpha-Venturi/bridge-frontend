
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBridgeCircleXmark, faBridge } from "@fortawesome/sharp-solid-svg-icons"

const BridgeIcon = ({ active }: { active: boolean }) => {
    if (active) {
        return (
            <FontAwesomeIcon icon={faBridge} size={'5x'} />
        )
    }
    return (
        <FontAwesomeIcon icon={faBridgeCircleXmark} size={'5x'} className="text-danger" />
    )
}

export default BridgeIcon