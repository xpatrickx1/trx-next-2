
import { useTheme } from '../components/ThemeContext';

const gradientImages = [
  { top: '-420px', left: '-438px', rotate: '0deg', z: '-z-10', scale: 1.5 },
  { top: '260px', right: '-430px', rotate: '-20deg', scale: 1.5 },
  { top: '898px', left: '-470px', rotate: '7deg', scale: 1.5 },
  { top: '1432px', right: '-480px', rotate: '-20deg', scale: 1.5 },
  { top: '2117px', left: '-510px', rotate: '-180deg', scale: 1.5 },
  { top: '2926px', left: '-440px', rotate: '320deg', scale: 1.5 },
];

const Backgrounds = () => {
  const { theme } = useTheme();
  const gradientSrc =
    theme === 'red' ? '/icons/bgGradient.png' : '/icons/bgGradientGreen.svg';

  return (
    <div className="absolute inset-0" style={{maxWidth: "425px", margin: "0 auto", zIndex: "-1"}}>
      {gradientImages.map((pos, index) => (
        <div
        key={index}
        className="absolute w-[730px] h-[790px]"
        style={{
          top: `${pos.top}`, 
            left: `${pos.left}`, 
            right: `${pos.right}`, 
            zIndex: `${pos.z}`, 
            transform: `rotate(${pos.rotate})`,
        }}
      >
        <img
          key={index}
          src={gradientSrc}
          alt={`Gradient ${index}`}
          style={{ 
            width: "730px", 
            height: "790px", 
            }}
          className="w-full h-full bg-spin"
        />
        </div>
      ))}
    </div>
  )
}

export default Backgrounds