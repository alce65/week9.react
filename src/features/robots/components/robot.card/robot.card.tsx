import { Robot } from '../../models/robot';
import './robot.card.css';

export function RobotCard({ item }: { item: Robot }) {
    const robot = {
        id: item.id,
        name: item.name,
        sprites: {
            front_default: item.image,
            back_default: item.image,
        },
    };
    const ref = `./detail.html?id=${robot.id}`;
    return (
        <li className="robot-item">
            <a className="robot-item__link" href={ref}>
                <span className="robot-item__link-label">{robot.name}</span>
                <span className="robot-item__link-sprite">
                    <img
                        className="robot-item__link-sprite-front"
                        src={robot.sprites?.front_default}
                        alt={robot.name}
                        width="150px"
                        height="150px"
                    />
                    <img
                        className="robot-item__link-sprite-back"
                        src={robot.sprites?.back_default}
                        alt={robot.name}
                        width="150px"
                        height="150px"
                    />
                </span>
            </a>
            <span
                className="robot-item__fav"
                id={`fav-${robot.id}`}
                data-id={robot.id}
            ></span>
        </li>
    );
}
