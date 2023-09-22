import Image from 'next/image';

export default function Advert() {
  return (
    <div className="p-7 pb-3 bg-[#1a1a1a] rounded-xl">
      <div className="flex items-center justify-between">
        <h5 className="text-[#E0E0E0] font-medium">Sponsored</h5>
        <p className="text-[#858585]">Create Ad</p>
      </div>
      <Image
        src="/images/cosmetics.jpg"
        alt=""
        width={640}
        height={640}
        className="rounded-xl my-3 h-[200px] object-cover"
      />
      <div className="flex items-center justify-between flex-wrap">
        <p className="text-[#C2C2C2]">Cosmetics Company</p>
        <p className="text-[#858585]">cosmeticscompany.com</p>
      </div>
      <p className="text-[#858585] text-sm my-2">
        Your way to stunning and glamorous beauty starts here. Made to brighten
        your skin and highlight your natural features.
      </p>
    </div>
  );
}
