function Frame() {
  return <div className="absolute bg-[#fff5d9] left-[49.85px] size-[100px] top-[64px]" />;
}

function Frame1() {
  return <div className="absolute bg-[#fab405] left-[314.85px] size-[100px] top-[64px]" />;
}

function Frame2() {
  return <div className="absolute bg-[#e94300] left-[584.85px] size-[100px] top-[64px]" />;
}

function Frame3() {
  return <div className="absolute bg-[#5957b0] left-[940.85px] size-[100px] top-[64px]" />;
}

export default function Frame4() {
  return (
    <div className="bg-white relative size-full">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}