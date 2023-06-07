import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

const style: React.CSSProperties = {
  textDecoration: 'none',
}

type LinkProps = {
  href: NextLinkProps['href']
  target?: string
  children?: React.ReactNode
}

const MyLink: React.FC<LinkProps> = (props) => (
  <NextLink href={props.href} legacyBehavior>
    <a style={style}>{props.children}</a>
  </NextLink>
)

export default MyLink
