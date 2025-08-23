const mongoose = require('mongoose');
const { connectToMongo } = require('./connection');
const Blog = require('./models/blog');
const dotenv = require('dotenv')

dotenv.config()
connectToMongo(process.env.MONGODBURL)

// Sample user ID - replace with actual ObjectId from your users collection
const userId = new mongoose.Types.ObjectId();

// Dummy blog data
const dummyBlogs = [
    {
        title: 'Getting Started with MERN Stack',
        body: `The MERN stack consists of MongoDB, Express, React, and Node.js. This powerful combination allows developers to build full-stack applications using JavaScript throughout the entire development process.

MongoDB serves as the document database, offering flexibility with JSON-like storage. Express provides a minimal and flexible Node.js web application framework, simplifying the creation of robust APIs. React handles the frontend with its component-based architecture, enabling developers to build interactive user interfaces. Node.js powers the backend, allowing JavaScript to run server-side.

Setting up a MERN project involves initializing a Node.js application, configuring Express middleware, connecting to MongoDB, and integrating React for the frontend. This architecture promotes efficient development workflows as teams can work with JavaScript across the entire application stack.

One of the biggest advantages of MERN is the use of a single language throughout, reducing context switching and enabling developers to move more fluidly between frontend and backend development tasks.`,
        coverImageUrl: 'https://picsum.photos/800/400?random=1',
        createdBy: userId
    },
    {
        title: 'Advanced React Hooks',
        body: `React Hooks have revolutionized how we build components in React. In this article, we'll explore some advanced hooks techniques including custom hooks, useCallback optimization, and more.

useState and useEffect are fundamental hooks that most developers quickly master, but the real power comes from combining hooks and creating custom solutions. The useCallback and useMemo hooks help optimize performance by preventing unnecessary re-renders and function recreations.

Custom hooks allow developers to extract component logic into reusable functions, promoting code reuse and separation of concerns. For example, a custom useFetch hook can encapsulate all the logic needed for data fetching, including loading states, error handling, and caching.

Context API combined with useContext provides a clean solution for state management without prop drilling. For more complex state requirements, useReducer offers a Redux-like approach within functional components.

Remember that hooks must be called at the top level of your components and cannot be conditional. This constraint ensures that hooks are called in the same order each time a component renders, which is crucial for React's internal hook tracking.`,
        coverImageUrl: 'https://picsum.photos/800/400?random=2',
        createdBy: userId
    },
    {
        title: 'MongoDB Best Practices',
        body: `Working with MongoDB requires understanding some key concepts and best practices. This post covers schema design, indexing strategies, and performance optimization techniques.

Unlike relational databases, MongoDB's document model requires a different approach to schema design. While MongoDB is schemaless, having a well-thought-out schema is still critical. Consider embedding related data in a single document when the data belongs together and is usually accessed together.

Proper indexing is essential for MongoDB performance. Create indexes that support your common query patterns, but be cautious about creating too many indexes as they can slow down write operations. Compound indexes should be designed with query patterns and sort operations in mind.

When working with large datasets, consider using MongoDB's aggregation framework for complex data processing operations. The pipeline approach allows for step-by-step transformation of documents, filtering, grouping, and calculation of results.

Database connection management is crucial in production applications. Implement connection pooling and handle connection errors properly. Use MongoDB Atlas for managed services that handle scaling, backups, and security configurations automatically.

Regular monitoring of query performance using the explain() method can help identify slow queries that need optimization. Consider using MongoDB Compass or other monitoring tools to gain insights into database performance.`,
        coverImageUrl: 'https://picsum.photos/800/400?random=3',
        createdBy: userId
    }
];

// Seed the database
const seedDB = async () => {
    try {
        // Clear existing data
        await Blog.deleteMany({});
        console.log('Cleared existing blogs');
        
        // Insert new data
        const seededBlogs = await Blog.insertMany(dummyBlogs);
        console.log(`Successfully seeded ${seededBlogs.length} blogs`);
        
        // Close connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.connection.close();
    }
};

seedDB();