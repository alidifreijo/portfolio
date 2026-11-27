from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage as ndi
im=np.asarray(Image.open('bob.png').convert('RGB')).astype(np.float32)/255
H,W,_=im.shape
bg=np.median(np.concatenate([im[:30].reshape(-1,3),im[:,:30].reshape(-1,3),im[:,-30:].reshape(-1,3)]),axis=0)
luma=im@np.array([.299,.587,.114],np.float32); bl=float(bg@np.array([.299,.587,.114]))
warm=(im[...,0]-im[...,2])-(bg[0]-bg[2])
green=im[...,1]-np.maximum(im[...,0],im[...,2])
m=(warm>0.035)|(luma<0.33)|(green>0.03)|(luma>bl+0.06)
m=ndi.binary_opening(m,iterations=2); m=ndi.binary_closing(m,iterations=6); m=ndi.binary_fill_holes(m)
lab,n=ndi.label(m); sizes=ndi.sum(m,lab,range(1,n+1)); m=lab==(1+int(np.argmax(sizes)))
m=ndi.binary_fill_holes(ndi.binary_closing(m,iterations=4))
ys,xs=np.where(m); print('bbox',xs.min(),xs.max(),ys.min(),ys.max(),'bg',bg)
dt=ndi.distance_transform_edt(m)
R=dt.max()
dome=np.sqrt(np.clip(1-(1-np.clip(dt/(R*0.85),0,1))**2,0,1))      # spherical inflate
dome=ndi.gaussian_filter(dome,10)
soft=ndi.gaussian_filter(m.astype(np.float32),5)
dep=np.clip(dome,0,1)
Image.fromarray((dep*255).astype(np.uint8)).resize((256,256),Image.LANCZOS).save('depth.png')
Image.fromarray((soft*255).astype(np.uint8)).resize((256,256),Image.LANCZOS).save('mask.png')
# pack depth(R) mask(G)
pk=np.dstack([np.asarray(Image.open('depth.png')),np.asarray(Image.open('mask.png')),np.zeros((256,256),np.uint8)])
Image.fromarray(pk).save('pack.png',optimize=True)
Image.open('bob.png').convert('RGB').save('bob.webp',quality=90,method=6)
import os; print(os.path.getsize('pack.png'),os.path.getsize('bob.webp'), 'feet', ys.max()/H, 'cx', (xs.min()+xs.max())/2/W)
