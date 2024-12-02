import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/avatar.jpg" // Ajusta el path a tu imagen
      alt="Anita Gonzalez Delgado"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
};

export default Avatar;
