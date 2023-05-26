class BookmarksController < ApplicationController
  def new
    @list = List.find(params[:list_id])
    @bookmark = Bookmark.new
  end

  def create
    @list = List.find(params[:list_id])
    @bookmark = Bookmark.new(bookmark_params)
    @bookmark.list = @list
    if @bookmark.save
      redirect_to list_path(@list)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @bookmark = Bookmark.find(params[:id])
    @bookmark.destroy
    redirect_to list_path(@bookmark.list), status: :see_other
  end

  def show
    @movie = Movie.find(params[:id])
    if @movie
      respond_to do |format|
        format.json { render json: @movie}
        # format.html { redirect_to lists_path}
      end
    end
    @movie
  end

  private

  def movie_params
    params.require(:bookmark).permit(:comment, :movie_id)
  end
end
