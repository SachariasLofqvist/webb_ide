export async function getAllNotes(req, res) {
    res.send("You fetched notes");
};

export async function createNote(req, res) {
    res.status(201).json({message:"Post created successfully"});
};

export async function editNote(req, res) {
    res.status(200).json({message:"Post updated successfully"});
};

export async function deleteNote(req, res) {
    res.status(200).json({message:"Post deleted successfully"});
};