# Physico - A Physics Engine for React

**Physico** is a fully customizable physics engine designed specifically for React. It allows users to define dynamic physical properties such as gravity, friction, drag, bounce, and more. Additionally, Physico supports custom images (sprites) for objects, making it ideal for projects requiring visual elements combined with physics-based interactions.

Physico is flexible and easy to integrate, allowing you to create physics-based simulations, games, and visual effects within your React application.

## Features

- **Dynamic Physical Properties**: Customize physics properties like gravity, friction, drag, bounce friction, and angular velocity.
- **Sprite Support**: Use your own images as sprites for objects in the physics engine.
- **Collisions and Reproduction**: Objects can detect collisions and reproduce new objects based on custom properties.
- **Performance-optimized**: Built using the HTML5 canvas for fast rendering and smooth animations.

---

## Installation

You can install Physico from npm using the following command:

```bash
npm install physico
```

This will add Physico as a dependency to your React project.

---

## Usage

To use Physico, simply import the `PhysicsEngine` component and customize it using the available props.

### Example

```jsx
import React from 'react';
import PhysicsEngine from 'physico';

const MyApp = () => {
  return (
    <div>
      <h1>Physico Physics Engine</h1>
      <PhysicsEngine
        gravity={0.3}
        friction={0.98}
        bounceFriction={0.8}
        drag={0.98}
        maxObjects={30}
        angularVelocityFactor={0.1}
        objectCount={10}
        userImages={[
          'https://example.com/image1.png',
          'https://example.com/image2.png',
        ]}
      />
    </div>
  );
};

export default MyApp;
```

### Adding to Your Project

1. **Import the `PhysicsEngine` Component**: Import Physico in your React component where you want to display the physics engine.
2. **Customize Physics Properties**: Pass custom properties like gravity, friction, and user images through props.
3. **Render the Physics Engine**: Physico will automatically render objects based on the properties provided, handling movement, collisions, and object reproduction.

---

## Props

### Physical Properties

You can control the behavior of the objects in the physics engine by passing the following props:

| Prop                    | Type     | Default                               | Description                                                                              |
|-------------------------|----------|---------------------------------------|------------------------------------------------------------------------------------------|
| `gravity`               | number   | `0.2`                                 | Controls the downward force applied to objects.                                           |
| `friction`              | number   | `0.99`                                | Friction applied to objects' movement (reduces velocity over time).                       |
| `bounceFriction`        | number   | `0.7`                                 | Controls how much objects bounce when colliding with the boundaries.                      |
| `drag`                  | number   | `0.99`                                | Simulates air resistance by reducing the objects' velocity in both axes.                  |
| `maxObjects`            | number   | `20`                                  | Maximum number of objects allowed on the canvas.                                          |
| `angularVelocityFactor`  | number   | `0.05`                                | Determines the speed of rotation for objects.                                             |
| `objectCount`           | number   | `5`                                   | Number of objects (sprites) to generate initially.                                        |
| `userImages`            | array    | `['https://via.placeholder.com/50']`  | Array of image URLs to use as sprites for the objects.                                    |

### Default Example

If you don't pass any custom props, Physico will fall back on its default settings:

```jsx
<PhysicsEngine />
```

This will render 5 objects with default physical properties and placeholder sprites.

---

## Detailed Example with Custom Images and Physics Properties

Here's an advanced example where we define our own custom sprites and adjust the physics properties to simulate different behaviors:

```jsx
import React from 'react';
import PhysicsEngine from 'physico';

const MyCustomApp = () => {
  return (
    <div>
      <h1>Physics with Custom Images and Properties</h1>
      <PhysicsEngine
        gravity={0.5} // Increased gravity for faster falling
        friction={0.9} // Less friction for smoother movement
        bounceFriction={0.85} // More bounce effect on collisions
        drag={0.97} // Increased drag for more realistic air resistance
        maxObjects={50} // Allow up to 50 objects on the screen
        angularVelocityFactor={0.08} // Faster rotation of objects
        objectCount={15} // Generate 15 objects
        userImages={[
          'https://example.com/ball.png',
          'https://example.com/star.png',
          'https://example.com/cube.png',
        ]}
      />
    </div>
  );
};

export default MyCustomApp;
```

In this example:
- **Gravity** is increased for a faster fall.
- **Friction** and **drag** are adjusted for smoother, more realistic movement.
- **Bounce friction** is higher for more pronounced bounce effects.
- **Custom images** are provided as sprites for the objects.

---

## Behavior

### Object Movement

- Objects will fall under the influence of gravity.
- Friction and drag slow down the movement, simulating realistic physical behavior.
- Objects bounce off the canvas boundaries according to the bounce friction.
- Objects spin based on the angular velocity factor.

### Collision and Reproduction

- When objects collide, they follow an elastic collision model.
- If a reproduction chance condition is met (default 1%), new objects can spawn upon collisions.

---

## Advanced Concepts

### Dynamic Sprites

Physico supports custom images, allowing you to create unique visual simulations. You can provide an array of image URLs via the `userImages` prop. These images will be used as the sprites for each object.

If an image fails to load, Physico will automatically fall back to a solid color rectangle to prevent crashes.

### Reproduction of Objects

Objects in Physico have a reproduction chance that determines whether new objects are spawned when two objects collide. This adds an additional layer of complexity to the simulation. The default chance is `1%`, but you can customize this in the `PhysicsEngine.js` source code if needed.

---

## Customization and Extensibility

Physico is designed to be highly customizable:
- **Physical Properties**: You can adjust gravity, drag, bounce friction, and more.
- **Custom Sprites**: Use any image you want as a sprite by providing an array of image URLs.
- **Object Count**: Dynamically adjust the number of objects generated in the engine.

---

## Future Improvements

Some potential future updates to **Physico** might include:
- **Interactive Controls**: Allow users to interact with objects (drag and drop).
- **Physics Enhancements**: Add support for more advanced physics properties like rotational inertia, collision detection between complex shapes, etc.
- **Sound Effects**: Integrate sound effects for collisions or other events.

---

## License

This project is licensed under the MIT License, meaning you can freely use, modify, and distribute it in your own projects. See the `LICENSE` file for more details.

---

## Contributing

Contributions to **Physico** are welcome! Whether you're fixing bugs, improving documentation, or adding new features, feel free to fork the repository and submit a pull request. Let's build something amazing together!

---

## Questions and Support

If you have any questions or run into issues, feel free to [open an issue](https://github.com/VSPaone/physico/issues) on GitHub.