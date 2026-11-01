/**
 * Photography registry. All photos are Unsplash (free to use under the Unsplash License).
 * Replace with your own team/office/product photography by editing the URLs here —
 * local files under /public work too (e.g. "/photos/team.jpg").
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const photos = {
  heroTeam: { src: u("1531482615713-2afd69097998"), alt: "Two engineers reviewing code together at a workstation" },
  engineeringFloor: { src: u("1551434678-e076c223a692"), alt: "Developers working at desks in an open studio" },
  workshop: { src: u("1522202176988-66273c2fd55f"), alt: "Product team collaborating around laptops" },
  boardroom: { src: u("1542744173-8e7e53415bb0"), alt: "Team meeting around a conference table" },
  presentation: { src: u("1556761175-5973dc0f32e7"), alt: "Designer presenting to the team in a studio" },
  skyline: { src: u("1480714378408-67cf0d13bc1b"), alt: "City skyline at sunrise" },
  towers: { src: u("1486406146926-c627a92ad1ab"), alt: "Glass office towers seen from below" },
  office: { src: u("1497366216548-37526070297c"), alt: "Modern office interior" },
  handshake: { src: u("1521791136064-7986c2920216"), alt: "Two people shaking hands in an office" },
  laptopCode: { src: u("1498050108023-c5249f4df085"), alt: "Laptop showing a code editor on a desk" },
  retail: { src: u("1441986300917-64674bd600d8"), alt: "Interior of a specialty apparel store" },
  opsDesk: { src: u("1504384308090-c894fdcc538d"), alt: "Open-plan operations office" },
  phone: { src: u("1512941937669-90a1b58e7e9c"), alt: "Smartphone showing a home screen of apps" },
  focus: { src: u("1573164713714-d95e436ab8d6"), alt: "Person working on a laptop at a window desk" },
} as const;

export type PhotoKey = keyof typeof photos;
