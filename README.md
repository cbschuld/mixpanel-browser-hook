# mixpanel-browser-hook

Provides a react hook for Mixpanel's `mixpanel-browser`

## Installation

Install the package using npm:

```bash
npm install mixpanel-browser-hook
```

## Usage

Here is an example of how to use `mixpanel-browser-hook` in your project:

```javascript
import useMixpanel from 'mixpanel-browser-hook'

function App() {
  const { trackEvent, identifyUser, setUserProperties } = useMixpanel(
    'YOUR_MIXPANEL_TOKEN',
  )

  // Track an event
  trackEvent('Button Clicked', { buttonName: 'Submit' })

  // Identify a user
  identifyUser('user-123')

  // Set user properties
  setUserProperties({ plan: 'premium', age: 30 })

  return <div>Your App Content</div>
}
```

## API

### `useMixpanel(token: string)`

Returns an object with the following methods:

- **`trackEvent(eventName: string, properties?: object): void`**  
  Tracks an event with optional properties.

- **`identifyUser(userId: string): void`**  
  Identifies a user with a unique ID.

- **`setUserProperties(properties: object): void`**  
  Sets properties for the identified user.

## License

This project is licensed under the MIT License.

## Contact

- **Email** - twitter handle @ gmail.com
- **X** - @cbschuld

## Contributing

Yes, thank you! Please update the docs and tests and add your name to the package.json file.
