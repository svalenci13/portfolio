import Image from "next/image"
import { ShoppingParticles } from "@/components/shopping-particles"

export function ShopifyLink() {
  return <>
    <a className="shopify-link" href="https://www.shopify.com" target="_blank" rel="noreferrer"><Image src="/logos/shopify.JPG" alt="" width={15} height={15} className="company-logo" />Shopify<ShoppingParticles /></a>, working on the {" "}
    <a className="shopify-link shop-app-link" href="https://apps.apple.com/us/app/shop-track-pay-discover/id1223471316" target="_blank" rel="noreferrer"><Image src="/logos/shop.jpg" alt="" width={15} height={15} className="company-logo full-color-logo" />Shop app<ShoppingParticles shop /></a>
  </>
}
