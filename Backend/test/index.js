// // Set the environment to 'test'
// process.env.NODE_ENV = 'test';

// // Using dynamic import for ES Modules in a CommonJS environment
// (async () => {
//     const chai = await import('chai');
//     const chaiHttp = await import('chai-http');
//     const server = await import('../server'); // Dynamically import the server

//     chai.default.should(); // For ES Modules, use `.default` when importing
//     chai.default.use(chaiHttp.default);

//     module.exports = chai.default;
// })();