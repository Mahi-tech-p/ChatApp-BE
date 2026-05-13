

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
    } catch (error) {
        return res.status(500).json({message:"Login Failed",error: error.message})
    }
}