import Image from 'next/image';

interface Props {
  image?: string;
  size?: string;
}
export default function UserImage({ image, size = '60px' }: Props) {
  return (
    <div
      className={`bg-gray-500 rounded-full overflow-hidden relative shrink-0`}
      style={{ width: `${size}`, height: `${size}` }}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="5vw"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
