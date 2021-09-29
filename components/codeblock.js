//https://thetombomb.com/posts/adding-code-snippets-to-static-markdown-in-Next%20js
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={materialLight}
                language={match[1]}
                PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>

        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

export default CodeBlock
