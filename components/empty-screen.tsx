import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconSparkles } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Is it going to rain in Seattle tomorrow ?',
    message: 'What is the weather in New York ?'
  },
  {
    heading: 'Whats the weather like right now ?',
    message: 'What is the temperature in London?'
  },
  {
    heading: 'Can you suggest any outdoor activities ?',
    message: 'What is the weather in Paris ?'
  },
  {
    heading: 'Can you show me a weather temperature map ?',
    message: 'What is the temperature in Tokyo ?'
  }
]

export function EmptyScreen({
  submitMessage
}: {
  submitMessage: (message: string) => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-12">
      <div className="rounded-md bg-background p-8 dark:border-none border border-foreground-muted  mb-4 w-full justify-center flex flex-col items-center">
        {/* <h1 className="mb-2 text-lg font-semibold">Welcome Weather AI</h1> */}
        <span className="text-2xl flex items-center my-5">
          {/* <span className="text-lg font-semibold">Weather</span> */}
          Weather
          <IconSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
          AI
        </span>
        <p className="mb-2 leading-normal text-muted-foreground text-center">
          A conversational AI model that can answer questions about the weather.
          You can ask about the weather in a specific city or get the
          temperature of a city.
        </p>

        {/* <p className="mb-2 leading-normal text-muted-foreground">
          The demo is built with{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and the{' '}
          <ExternalLink href="https://sdk.vercel.ai/docs">
            Vercel AI SDK
          </ExternalLink>
          .
        </p> */}
        {/* <p className="mb-2 leading-normal text-muted-foreground">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          to combine text with UI generated as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p> */}
        {/* <p className="leading-normal text-muted-foreground">Try an example:</p> */}
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4 justify-start">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
