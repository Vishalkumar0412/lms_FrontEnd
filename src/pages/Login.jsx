import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"
const Login = () => {
    const Navigate =useNavigate()
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })
    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [registerUser, { data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess }]
        = useRegisterUserMutation()


    const [loginUser, { data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess
    }] = useLoginUserMutation()

    const changeEventHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        }
        else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }
    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;

        const res = await action(inputData)
        if (!res.data) {
            console.warn("No content availble")
        }
    };
    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful");
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful");
            Navigate('/')
           
        }
        if (registerError && registerError.data) {
            toast.error(registerError.data.message || "Signup failed");
        }
        if (loginError && loginError.data) {
            toast.error(loginError.data.message || "Login failed");
        }
    }, [loginIsSuccess, registerIsSuccess, loginError, registerError]);
    
    return (
        <div className="flex items-center justify-center mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Sign up now and start your journey to limitless learning!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => changeEventHandler(e, "signup")}
                                    placeholder="eg. Vishal Nigam"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeEventHandler(e, "signup")}
                                    type="email"
                                    placeholder="eg. Vishal@example.com"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    value={signupInput.password}
                                    id="password"
                                    type="password"
                                    onChange={(e) => changeEventHandler(e, "signup")}
                                    placeholder="eg. xyz"
                                    required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => { handleRegistration("signup") }}>
                                {
                                    registerIsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin">Please Wait</Loader2>
                                        : 'Register'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login to continue your learning journey!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name='email'
                                    value={loginInput.email}
                                    onChange={(e) => changeEventHandler(e, "login")}
                                    type="email"
                                    placeholder="eg. Vishal@example.com"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">password</Label>
                                <Input
                                    id="password"
                                    name='password'
                                    value={loginInput.password}
                                    onChange={(e) => changeEventHandler(e, "login")}
                                    type="password"
                                    placeholder="eg. xyz"
                                    required />
                            </div>
                        </CardContent>
                        <CardFooter>

                            <Button disabled={loginIsLoading} onClick={() => { handleRegistration("login") }}>
                                {
                                    loginIsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin">Please Wait</Loader2>
                                        : 'Login'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login;