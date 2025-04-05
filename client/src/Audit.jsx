import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Audit = () => {
  const [token, setToken] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(token);
    if (token) {
      fetchLogs();
    }
  }, [token]);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://67f00fb52a80b06b8896c3bf.mockapi.io/api/v1/audit_logs`,);
      setAuditLogs(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value); 
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-md bg-white/10 border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-2">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex justify-center mb-2"
              >
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </span>
              </motion.div>
              <CardTitle className="text-2xl font-bold text-center text-white">
                TaskMaster
              </CardTitle>
              <p className="text-center text-gray-300 text-sm">
                Sign in to manage your tasks efficiently
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 bg-white/5">
                  <TabsTrigger
                    value="login"
                    className="text-sm data-[state=active]:bg-white/10"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="text-sm data-[state=active]:bg-white/10"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={login} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={register} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0"
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <h1>Audit Logs</h1>
      <Input onChange={handleInputChange} placeholder="User Id" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {auditLogs
            .filter((log) => userId === '' || log.user_id.toString() === userId)
            .map((log) => (
              <li key={log.id}>
                <strong>Action:</strong> {log.action} <br />
                <strong>User ID:</strong> {log.user_id} <br />
                <strong>Entity Type:</strong> {log.entity_type} <br />
                <strong>Entity ID:</strong> {log.entity_id} <br />
                <strong>Timestamp:</strong> {log.timestamp} <br />
                <hr />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Audit;
