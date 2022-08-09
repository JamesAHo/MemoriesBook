


// Using Define model method
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("posts", {
        name: {
            type: DataTypes.STRING,
            required: true,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
        },
        summary: {
            type: DataTypes.STRING,
            required: true,
            
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                
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
     return Post;
}