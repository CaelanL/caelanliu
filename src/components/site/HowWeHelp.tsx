const items = [
  {
    title: 'A website built for your trade',
    body: 'We write and build the whole site for you: the pages, the photos, the copy, the contact forms. You review it and tell us what to change. Most of our clients spend under two hours on it, total.',
  },
  {
    title: 'Local search positioning',
    body: 'We set up and maintain your Google Business Profile and local listings, and tune the site for the searches your customers actually make, like the ones for AC repair or roof replacement in your city. The goal is the top three spots on the map, where the calls come from.',
  },
  {
    title: 'Call tracking and call connect',
    body: 'Every call gets a tracking number so you know which pages and searches produced it. When someone fills out your form, our call-connect tool dials them right away and rings your office phone at the same time. People who hear back within five minutes usually book the job.',
  },
  {
    title: 'Same-day edits',
    body: 'Need a price changed, a photo swapped, or a new service page up before the weekend? Email or text us and it is done the same day. No ticket queues and no waiting a week for your old web guy.',
  },
];

export default function HowWeHelp() {
  return (
    <section id='how-we-help' className='border-b border-muted-line'>
      <div className='mx-auto max-w-5xl px-6 py-20'>
        <h2 className='text-3xl font-semibold tracking-tight text-fg md:text-4xl'>
          How we help
        </h2>
        <p className='mt-4 max-w-2xl text-muted'>
          You run the trucks and the crews. We handle everything that happens
          online, and it all rolls up to one monthly bill.
        </p>
        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          {items.map((item) => (
            <div
              key={item.title}
              className='rounded-lg border border-muted-line bg-amber-glow p-6'
            >
              <h3 className='text-lg font-semibold text-fg'>{item.title}</h3>
              <p className='mt-3 leading-relaxed text-muted'>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
