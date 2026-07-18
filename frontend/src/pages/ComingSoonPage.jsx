export default function ComingSoonPage({ title, tahap }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 px-6">
      <div className="glass-card rounded-3xl px-10 py-12 max-w-md">
        <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-5">
          <span className="text-on-primary-container font-bold text-xl">{tahap}</span>
        </div>
        <h2 className="text-xl font-semibold text-on-surface mb-2">{title}</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Halaman ini akan dibangun pada Tahap {tahap} sesuai roadmap DanceBook.
          Kerangka navigasi dan tema pastel pink sudah siap digunakan.
        </p>
      </div>
    </div>
  );
}