# In-car montage: live HMI frames composited into the cluster of the interior photo, with a slow push-in.
import sys, os, math
from PIL import Image, ImageDraw, ImageFilter, ImageChops
Image.MAX_IMAGE_PIXELS = None
D = os.path.dirname(os.path.abspath(__file__))
PHOTO = '/mnt/user-data/attachments/bc800774-a202-57bb-ac79-0d8a44d26643/3f286d7e-image.png'
SRC = os.path.join(D, '../live/df')          # drive frames 1600x900, HMI at scale 1.45, centred
OUT = sys.argv[1]; frames = [int(x) for x in sys.argv[2].split(',')] if len(sys.argv) > 2 else None
FPS, DUR, START = 30, 10, 120                # HMI starts at t=4s of the drive
W, H = 1920, 1080
photo = Image.open(PHOTO).convert('RGB')
OX, OY = 1000, 2300                          # cluster crop origin in the full photo
# screen + occlusion mask in crop coords
SCR = (80, 146, 1324, 612)
mask = Image.new('L', (1460, 660), 0); d = ImageDraw.Draw(mask)
d.rounded_rectangle(SCR, 18, fill=255)
# steering-wheel rim (outside the stitched inner edge) hides the top corners
rim = Image.new('L', mask.size, 0); ImageDraw.Draw(rim).ellipse((708-903, 849-903, 708+903, 849+903), fill=255)
mask = ImageChops.multiply(mask, rim)
# hub hides the bottom centre
ImageDraw.Draw(mask).ellipse((720-1100, 1364-836, 720+1100, 1364+836), fill=0)
mask = mask.filter(ImageFilter.GaussianBlur(2.2))
base = photo.crop((OX, OY, OX+1460, OY+660))
GLARE = Image.new('L', (200, 80), 0)
for y in range(80):
    for x in range(200):
        v = max(0, 1 - abs((x*0.4 + y) - 70) / 22) * 14 + max(0, 1 - y/30) * 6   # one soft diagonal sheen + top light
        GLARE.putpixel((x, y), int(v))
GLARE = Image.merge('RGB', [GLARE]*3)
def screen(k):
    f = Image.open(f'{SRC}/f{START+k:05d}.jpg').convert('RGB').crop((70, 135, 1530, 765))  # HMI with its own dark field
    sw, sh = SCR[2]-SCR[0], SCR[3]-SCR[1]
    s = 1.0 * sh / f.height * 1.0
    tw = int(f.width * s); f = f.resize((tw, sh), Image.LANCZOS)
    bg = Image.new('RGB', (sw, sh), (11, 22, 32)); bg.paste(f, ((sw-tw)//2, -8))
    # slight glass: brighten the top a touch, keep the original reflections faintly
    bg = ImageChops.add(bg, GLARE.resize(bg.size))
    return bg
def ease(t): t = max(0, min(1, t)); return t*t*(3-2*t)
# camera: wide cockpit → into the cluster
A = (2494, 2780, 4988)                       # centre x, centre y, crop width
B = (OX+700, OY+372, 1560)
lst = frames if frames is not None else range(FPS*DUR)
os.makedirs(OUT, exist_ok=True)
for k in lst:
    t = k / FPS; e = ease((t-1.2)/7.0)
    cx = A[0]+(B[0]-A[0])*e; cy = A[1]+(B[1]-A[1])*e
    cw = A[2]*math.exp(math.log(B[2]/A[2])*e); ch = cw*H/W
    comp = photo.crop((int(cx-cw/2), int(cy-ch/2), int(cx+cw/2), int(cy+ch/2)))
    # paste the live screen
    sc = screen(k); m = mask.crop(SCR)
    px, py = OX+SCR[0]-int(cx-cw/2), OY+SCR[1]-int(cy-ch/2)
    comp.paste(sc, (px, py), m)
    comp = comp.resize((W, H), Image.LANCZOS)
    comp.save(f'{OUT}/f{k:05d}.jpg', quality=92)
