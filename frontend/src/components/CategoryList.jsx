import React from 'react'
import { Layers2, Pencil } from "lucide-react"

const CategoryList = ({ Categories, onEditCategory,}) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>
      {/* Category list */}
      {Categories.length === 0 ? (
        <p className="text-gray-500">
          No categories added yet. add some to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              {/* Icon /Emoji display */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-800 flex-shrink-0">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                ) : (
                  <Layers2 className="text-purple-800" size={24} />
                )}
              </div>
              {/* Category Details */}
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  {category.name}
                </p>
                <p className="text-sm text-gray-400 mt-1 capitalize">
                  {category.type}
                </p>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => onEditCategory(category)}
                  className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded hover:bg-blue-50"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList