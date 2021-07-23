function rainbowStop(h) 
{
  let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);  
  let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('');
  return ( rgb2hex(f(0), f(8), f(4)) );
} 