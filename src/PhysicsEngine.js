import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Helper function to get a random number between two values
const randomBetween = (min, max) => Math.random() * (max - min) + min;

// Load images (sprites) asynchronously
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

const PhysicsEngine = ({
  gravity = 0.2,
  friction = 0.99,
  bounceFriction = 0.7,
  drag = 0.99,
  maxObjects = 20,
  angularVelocityFactor = 0.05,
  objectCount = 5,
  userImages = ["https://via.placeholder.com/50"], // User provided images
}) => {
  const canvasRef = useRef(null);
  const [objects, setObjects] = useState([]);

  // Initialize objects with dynamic properties (e.g., size, position)
  const createObjects = async () => {
    const objs = [];
    const images = await Promise.all(userImages.map(loadImage));

    for (let i = 0; i < objectCount; i++) {
      const img = images[i % images.length]; // Loop through user images if fewer than objects
      objs.push({
        x: randomBetween(50, window.innerWidth - 50),
        y: randomBetween(50, window.innerHeight - 50),
        width: randomBetween(30, 50),
        height: randomBetween(30, 50),
        sprite: img,
        velocityX: randomBetween(-5, 5),
        velocityY: randomBetween(-5, 5),
        angle: randomBetween(0, 360),
        angularVelocity: randomBetween(-angularVelocityFactor, angularVelocityFactor),
        scale: 1,
        mass: 1,
        reproductionChance: 0.01, // Small chance to reproduce on collision
      });
    }

    return objs;
  };

  // Detect collisions between objects
  const detectCollisions = (obj1, obj2) => {
    const distX = obj1.x - obj2.x;
    const distY = obj1.y - obj2.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance < (obj1.width + obj2.width) / 2;
  };

  // Update object positions, apply gravity, handle collisions, and bounce
  const updateObject = (obj, width, height) => {
    // Apply gravity
    obj.velocityY += gravity;
    obj.velocityX *= drag;
    obj.velocityY *= drag;

    // Update position based on velocity
    obj.x += obj.velocityX;
    obj.y += obj.velocityY;

    // Collision detection with walls
    if (obj.x + obj.width / 2 > width || obj.x - obj.width / 2 < 0) {
      obj.velocityX = -obj.velocityX * bounceFriction;
    }
    if (obj.y + obj.height / 2 > height || obj.y - obj.height / 2 < 0) {
      obj.velocityY = -obj.velocityY * bounceFriction;
    }

    // Keep object within canvas boundaries
    obj.x = Math.min(Math.max(obj.width / 2, obj.x), width - obj.width / 2);
    obj.y = Math.min(Math.max(obj.height / 2, obj.y), height - obj.height / 2);

    // Apply angular velocity for rotation
    obj.angle += obj.angularVelocity;

    // Apply scaling (optional)
    if (obj.scale >= 1.5) obj.scale = 1;
    obj.scale += 0.01;
  };

  // Reproduction logic: Chance to spawn new objects on collision
  const reproduceObject = (obj, obj2) => {
    if (Math.random() < obj.reproductionChance && objects.length < maxObjects) {
      return {
        x: (obj.x + obj2.x) / 2,
        y: (obj.y + obj2.y) / 2,
        width: (obj.width + obj2.width) / 2,
        height: (obj.height + obj2.height) / 2,
        sprite: obj.sprite, // Reuse parent sprite
        velocityX: randomBetween(-5, 5),
        velocityY: randomBetween(-5, 5),
        angle: randomBetween(0, 360),
        angularVelocity: randomBetween(-angularVelocityFactor, angularVelocityFactor),
        scale: 1,
        mass: 1,
      };
    }
    return null;
  };

  // Advanced elastic collision response using impulse physics
  const handleCollisionResponse = (obj1, obj2) => {
    const vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
    const distance = Math.sqrt(vCollision.x ** 2 + vCollision.y ** 2);
    const vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
    const vRelativeVelocity = { x: obj1.velocityX - obj2.velocityX, y: obj1.velocityY - obj2.velocityY };
    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

    if (speed < 0) return;

    const impulse = (2 * speed) / (obj1.mass + obj2.mass);

    obj1.velocityX -= impulse * obj2.mass * vCollisionNorm.x;
    obj1.velocityY -= impulse * obj2.mass * vCollisionNorm.y;
    obj2.velocityX += impulse * obj1.mass * vCollisionNorm.x;
    obj2.velocityY += impulse * obj1.mass * vCollisionNorm.y;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const initialize = async () => {
      const initialObjects = await createObjects();
      setObjects(initialObjects);
    };

    initialize();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const newObjects = [...objects];

      objects.forEach((obj, idx) => {
        updateObject(obj, width, height);

        // Check for collisions with other objects
        for (let i = idx + 1; i < objects.length; i++) {
          const obj2 = objects[i];
          if (detectCollisions(obj, obj2)) {
            handleCollisionResponse(obj, obj2);

            // Reproduce new objects
            const newObject = reproduceObject(obj, obj2);
            if (newObject) {
              newObjects.push(newObject);
            }
          }
        }

        // Draw the object with sprite
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate((obj.angle * Math.PI) / 180);
        ctx.scale(obj.scale, obj.scale);
        ctx.drawImage(obj.sprite, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        ctx.restore();
      });

      setObjects(newObjects);
      requestAnimationFrame(animate);
    };

    animate();
  }, [objects]);

  return <canvas ref={canvasRef}></canvas>;
};

// PropTypes for validation
PhysicsEngine.propTypes = {
  gravity: PropTypes.number,
  friction: PropTypes.number,
  bounceFriction: PropTypes.number,
  drag: PropTypes.number,
  maxObjects: PropTypes.number,
  angularVelocityFactor: PropTypes.number,
  objectCount: PropTypes.number,
  userImages: PropTypes.arrayOf(PropTypes.string),
};

export default PhysicsEngine;
