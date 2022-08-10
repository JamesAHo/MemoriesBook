


// Using Define model method
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comment", {
       
        content: {
            type: DataTypes.STRING,
            required: true,
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model:"user",
                key:"id",
            }
        }
       
        
    },
    {
        timestamps: true,
    },
    {

    }
    )
     return Comment;
}